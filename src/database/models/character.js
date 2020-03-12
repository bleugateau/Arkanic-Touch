import {Model} from "objection";
import {DatabaseManager} from "../databaseManager";
import CharacterBaseInformations from "../../protocol/types/CharacterBaseInformations";
import EntityLook from "../../protocol/types/EntityLook";

Model.knex(DatabaseManager.auth);

export default class Character extends Model {

    static get tableName() {
        return 'character';
    }

    static get idColumn() {
        return 'character_id';
    }


    getCharacterBaseInformations(){
        return new CharacterBaseInformations(this.character_id, this.level, this.name, new EntityLook(JSON.parse(this.skins), JSON.parse(this.color), [], [this.scales]), this.breed, this.sex);
    }


}