import knex from "knex";
import {Config} from "../../config/config";

var authInstance = knex({
    client: 'mysql2',
    connection: {
        host: Config.MYSQL_HOST,
        user: Config.MYSQL_USER,
        password: Config.MYSQL_PASSWORD,
        database: Config.MYSQL_DATABASE_NAME
    },
});


export const DatabaseManager = {
    auth: authInstance
};