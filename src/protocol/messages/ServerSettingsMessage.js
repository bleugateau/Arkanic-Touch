export default class ServerSettingsMessage {
    constructor() {
        //constructor
        this._messageType = "ServerSettingsMessage";
        this.lang = "fr";
        this.community = 0;
        this.gameType = 0;
        this._isInitialized = true;
    }
};