import fs from "fs";
import ApproachHandler from "../handlers/approachHandler";

var handlerList = {
    AuthenticationTicketMessage: {call: ApproachHandler.authenticationTicketMessageHandler},
    CharactersListRequestMessage: {call: ApproachHandler.charactersListRequestMessageHandler},
    CharacterCreationRequestMessage: {call: ApproachHandler.characterCreationRequestHandler},
    CharacterSelectionMessage: {call: ApproachHandler.characterSelectionMessageHandler}
};

export const HandlerManager = {
    /**
     * Intercept message and redirect it to handler
     * @param messageData
     * @returns {Promise<void>}
     */
    intercept: async (client, messageData) => {
        if (!messageData.type) {
            return;
        }

        var handler = handlerList[messageData.type];

        if (handler) {
            handler.call(client, messageData);
        }
        else{
            console.log(`Unknow ${messageData.type} message !`);
        }
    },
    /**
     * Build message from data
     * @param {class} object
     * @param messageData
     * @returns {*}
     */
    buildMessageFromData: (object, messageData) => {
        let buildedMessage = new object();

        for (let prop in messageData) {
            buildedMessage[prop] = messageData[prop];
        }

        return buildedMessage;
    }
};