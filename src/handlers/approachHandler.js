import {HandlerManager} from "../managers/handlerManager";
import AuthenticationTicketMessage from "../protocol/messages/client/AuthenticationTicketMessage";
import Account from "../database/models/account";
import AuthenticationTicketAcceptedMessage from "../protocol/messages/AuthenticationTicketAcceptedMessage";
import ServerSettingsMessage from "../protocol/messages/ServerSettingsMessage";
import ServerOptionalFeaturesMessage from "../protocol/messages/ServerOptionalFeaturesMessage";
import AccountCapabilitiesMessage from "../protocol/messages/AccountCapabilitiesMessage";
import TrustStatusMessage from "../protocol/messages/TrustStatusMessage";
import CharactersListRequestMessage from "../protocol/messages/client/CharactersListRequestMessage";
import CharactersListMessage from "../protocol/messages/CharactersListMessage";
import CharacterCreationRequestMessage from "../protocol/messages/client/CharacterCreationRequestMessage";
import CharacterCreationResultMessage from "../protocol/messages/CharacterCreationResultMessage";
import Character from "../database/models/character";
import {CharacterCreationResultEnum} from "../protocol/enums/characterCreationResultEnum";
import {Config} from "../../config/config";
import Heads from '../../dist/map/Heads';
import CharacterSelectionMessage from "../protocol/messages/client/CharacterSelectionMessage";
import TowerOfAscensionResultsMessage from "../protocol/messages/TowerOfAscensionResultsMessage";
import CharacterSelectedSuccessMessage from "../protocol/messages/CharacterSelectedSuccessMessage";
import InventoryContentMessage from "../protocol/messages/InventoryContentMessage";

export default class ApproachHandler {
    static async authenticationTicketMessageHandler(client, authenticationTicketMessage){
        authenticationTicketMessage = await HandlerManager.buildMessageFromData(AuthenticationTicketMessage, authenticationTicketMessage.data);

        Account.query().where('ticket', '=', authenticationTicketMessage.ticket).withGraphFetched('characters').then((response) => {
            if(response[0] instanceof Account){
                client.account = response[0];

                client.spark.write(new AuthenticationTicketAcceptedMessage());
                client.spark.write(new ServerSettingsMessage());
                client.spark.write(new ServerSettingsMessage());
                client.spark.write(new ServerOptionalFeaturesMessage());
                client.spark.write(new AccountCapabilitiesMessage(response[0].account_id));
                client.spark.write(new TrustStatusMessage(true));
            }
            else{
                client.spark.end();
            }
        });
    }

    static async charactersListRequestMessageHandler(client, charactersListRequestMessage){
        charactersListRequestMessage = await HandlerManager.buildMessageFromData(CharactersListRequestMessage, charactersListRequestMessage.data);

        //spark.write(new CharactersListMessage());
        client.spark.write(new CharactersListMessage(client.account.characters.map((character) => character.getCharacterBaseInformations())));
    }

    static async characterCreationRequestHandler(client, characterCreationRequestMessage) {
        characterCreationRequestMessage = await HandlerManager.buildMessageFromData(CharacterCreationRequestMessage, characterCreationRequestMessage.data);

        const character = await Character.query().where('name', '=', characterCreationRequestMessage.name);

        //check if character with same name exist
        if(character[0] instanceof Character){
            client.spark.write(new CharacterCreationResultMessage(CharacterCreationResultEnum.UNAVAILABLE_NAME));
            return;
        }

        //check if maximum characters
        if(client.account.characters.length >= Config.MAX_CHARACTER){
            client.spark.write(new CharacterCreationResultMessage(CharacterCreationResultEnum.TOO_MANY_CHARACTERS));
            return;
        }

        //check colors
        if(characterCreationRequestMessage.colors.filter(color => typeof color === 'number' && color > 0).length !== 5){
            client.spark.write(new CharacterCreationResultMessage(CharacterCreationResultEnum.ERROR));
            return;
        }

        //check sex
        if(typeof characterCreationRequestMessage.sex !== 'boolean'){
            client.spark.write(new CharacterCreationResultMessage(CharacterCreationResultEnum.ERROR));
            return;
        }

        //check breeds and cosmeticId by Head.json
        const head = Heads[characterCreationRequestMessage.cosmeticId];

        if(head && head.breed === characterCreationRequestMessage.breed && (head.gender === 1 ? true : false) === characterCreationRequestMessage.sex){

            await Character.query().insert({
                account_id: client.account.account_id,
                name: characterCreationRequestMessage.name,
                level: Config.START_LEVEL,
                breed: characterCreationRequestMessage.breed,
                sex: characterCreationRequestMessage.sex,
                color: JSON.stringify(characterCreationRequestMessage.colors),
                skins: JSON.stringify([parseInt(head.assetId.split('_')[0]), parseInt(head.skins)]),
                scales: 125
            });

            client.spark.write(new CharacterCreationResultMessage(0));
            client.spark.write(new CharactersListMessage(client.account.characters.map((character) => character.getCharacterBaseInformations())));
        }
        else{
            client.spark.write(new CharacterCreationResultMessage(CharacterCreationResultEnum.ERROR));
        }
    }

    /**
     *
     * @param {WorldClient} client
     * @param {CharacterSelectionMessage} characterSelectionMessage
     * @returns {Promise<void>}
     */
    static async characterSelectionMessageHandler(client, characterSelectionMessage){
        characterSelectionMessage = await HandlerManager.buildMessageFromData(CharacterSelectionMessage, characterSelectionMessage.data);

        const character = await Character.query()
            .where('character_id', '=', characterSelectionMessage.id)
            .where('account_id', '=', client.account.account_id);

        if(!(character[0] instanceof Character)){
            client.spark.end();
            return;
        }


        client.activeCharacter = character[0];

        client.spark.write(new TowerOfAscensionResultsMessage());
        client.spark.write(new CharacterSelectedSuccessMessage(character[0].getCharacterBaseInformations()));
        client.spark.write(new InventoryContentMessage([], 1000));


    }
}