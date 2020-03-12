export default class ProtocolRequired {
    constructor(requiredVersion = 0, currentVersion = 0) {
        //constructor
        this._messageType = "ProtocolRequired";
        this.requiredVersion = requiredVersion;
        this.currentVersion = currentVersion;
        this._isInitialized = true;
    }
};