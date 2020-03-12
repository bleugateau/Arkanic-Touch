import express from 'express'
import cors from 'cors';
import Primus from "primus";
import {WorldManager} from "../../managers/worldManager";
import WorldClient from "../client/worldClient";

export default class WorldServer {
    /**
     *
     * @param {int} port
     */
    constructor(port) {
        const app = express();

        app.use(express.json());
        app.use(cors());

        this.server = new Primus(app.listen(port), {
            transformer: "engine.io",
            transport: "polling"
        });

        console.log('\x1b[31m%s\x1b[0m > Arkanic Server started on %s', '[WORLD]', port);
    }

    start(){
        this.server.on('connection', (spark) => {
            console.log('Client try connect to world');

            let client = new WorldClient(spark);
            client.initialize();

            WorldManager.addClient(client);

            WorldManager.debug();
        });
    }
}