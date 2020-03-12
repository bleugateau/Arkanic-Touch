export default class HelloConnectMessage {
    constructor(salt = "", key = []) {
        //constructor
        this._messageType = "HelloConnectMessage";
        this.salt = salt;
        this.key = key;
        this._isInitialized = true;
    }
};