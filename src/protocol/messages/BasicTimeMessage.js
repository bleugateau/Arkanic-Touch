export default class BasicTimeMessage {
    constructor() {
        //constructor
        this._messageType = "BasicTimeMessage";
        this.timestamp = 0;
        this.timezoneOffset = 0;
        this._isInitialized = true;
    }
};