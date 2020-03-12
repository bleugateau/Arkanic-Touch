import {Model} from "objection";
import {DatabaseManager} from "../databaseManager";
import Character from "./character";

Model.knex(DatabaseManager.auth);

export default class Account extends Model {

    static get tableName() {
        return 'account';
    }

    static get idColumn() {
        return 'account_id';
    }

    static get relationMappings() {
        return {
            characters: {
                relation: Model.HasManyRelation,
                modelClass: Character,
                join: {
                    from: 'account.account_id',
                    to: 'character.account_id'
                }
            }
        }
    }
}