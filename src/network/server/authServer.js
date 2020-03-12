import Primus from 'primus';
import uuidAPIKey from "uuid-apikey";

import ProtocolRequired from "../../protocol/messages/ProtocolRequired";
import HelloConnectMessage from "../../protocol/messages/HelloConnectMessage";
import Account from "../../database/models/account";
import IdentificationSuccessMessage from "../../protocol/messages/IdentificationSuccessMessage";
import ServersListMessage from "../../protocol/messages/ServersListMessage";
import GameServerInformations from "../../protocol/types/GameServerInformations";
import SelectedServerDataMessage from "../../protocol/messages/SelectedServerDataMessage";
import {Config} from "../../../config/config";
import AuthClient from "../client/authClient";

export default class AuthServer {
    /**
     * @param {http} httpServer
     */
    constructor(httpServer) {
        this.server = new Primus(httpServer, {
            transformer: "engine.io",
            transport: "polling"
        });

        this.authClientList = [];
        console.log('\x1b[32m%s\x1b[0m > Arkanic Server started on %s', '[AUTH]', Config.AUTH_PORT);
    }

    start(){
        this.server.on('connection', (spark) => {
            this.authClientList.push(new AuthClient(spark));
            console.log(`Client try to connect ! size of list ${this.authClientList.length}`);

            spark.on('data', (message) => {
                if(message.call){
                    switch(message.call){
                        case 'connecting':
                            spark.write(new ProtocolRequired(1594, 1592));
                            spark.write(new HelloConnectMessage());
                            break;
                        case 'login':
                            const {username, token} = message.data;
                            Account.query().where('login', '=', username).where('token', '=', token).then((response) => {
                                if(response[0] instanceof Account){
                                    spark.write(new IdentificationSuccessMessage(response[0].login, `[${response[0].login}]`, response[0].account_id, "DELETE ?"));
                                    spark.write(new ServersListMessage([
                                        new GameServerInformations(403, "Ten",3, 0, 0)
                                    ]));

                                    this.authClientList.filter(client => client.spark === spark).map((client) => {
                                        let ticket = (uuidAPIKey.create().uuid + '-' + Math.random().toString(36).slice(2));

                                        client.account = response[0];
                                        client.account.ticket = ticket;

                                        //generate new ticket
                                        Account.query().where('login', '=', username).patch({
                                            ticket: ticket
                                        }).execute();

                                        return client;
                                    });
                                }
                                else{
                                    spark.end();
                                }
                            });
                            break;
                        case 'reconnecting':
                            spark.end();
                            break;
                        case 'sendMessage':
                            const {type, data} = message.data;

                            switch (type) {
                                case 'ServerSelectionMessage':
                                    let authClient = this.authClientList.filter(client => client.spark === spark);

                                    if(authClient[0] instanceof AuthClient && authClient[0].account){
                                        spark.write(new SelectedServerDataMessage(data.serverId, "127.0.0.1", 666, authClient[0].account.ticket, "http://localhost:666"));
                                    }
                                    else{
                                        spark.end();
                                    }
                                    break;
                            }
                            break;
                        case 'disconnecting':
                            if(message.data && message.data === 'SWITCHING_TO_GAME'){
                                spark.end();
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            spark.on('end', () => {
                this.authClientList = this.authClientList.filter(client => client.spark !== spark);
                console.log(`Client disconnected ! size of list ${this.authClientList.length}`);
            })
        });
    }
}