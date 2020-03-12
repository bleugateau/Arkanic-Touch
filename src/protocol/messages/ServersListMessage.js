import GameServerInformations from "../types/GameServerInformations";

export default class ServersListMessage {
    constructor(servers = []) {
        //constructor
        this._messageType = "ServersListMessage";
        this.servers = servers; //Type: GameServerInformations
        this._isInitialized = true;
    }
};