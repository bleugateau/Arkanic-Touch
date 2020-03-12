export default class TrustStatusMessage {
    constructor(trusted = false) {
        //constructor
        this._messageType = "TrustStatusMessage";
        this.trusted = trusted;
        this._isInitialized = true;
    }
};