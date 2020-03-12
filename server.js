import express from 'express'
import cors from 'cors';

import {Config} from './config/config'
import jsonConfig from './config/config.json';
import router from "./routes/routes";
import AuthServer from "./src/network/server/authServer";
import WorldServer from "./src/network/server/worldServer";
import {WorldManager} from "./src/managers/worldManager";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/primus', express.static('dist/primus'));
app.use('/', express.static('dist/'));
app.use(router);

//config.json
app.get('/config.json', (req, res) => {
    return res
        .status(200)
        .send(jsonConfig)
});

const server = app.listen(Config.AUTH_PORT);

//authServer
const authServer = new AuthServer(server);
authServer.start();

//worldServer
const worldServer = new WorldServer(Config.WORLD_PORT);
worldServer.start();