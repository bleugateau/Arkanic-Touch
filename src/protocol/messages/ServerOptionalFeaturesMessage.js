export default class ServerOptionalFeaturesMessage {
    constructor() {
        //constructor
        this._messageType = "ServerOptionalFeaturesMessage";
        this.features = [1, 2, 3, 5];
        this._isInitialized = true;
    }
};