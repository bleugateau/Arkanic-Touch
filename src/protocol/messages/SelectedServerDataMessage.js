export default class SelectedServerDataMessage {
    constructor(serverId = 0, address = "", port = 0, ticket = "", access = "") {
        //constructor
        this._messageType = "SelectedServerDataMessage";
        this.serverId = serverId;
        this.address = address;
        this.port = port;
        this.canCreateNewCharacter = true;
        this.ticket = ticket;
        this._isInitialized = true;
        this._access = access;
    }
};