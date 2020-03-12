export default class CharacterCreationResultMessage {
    constructor(result = 0) {
        //constructor
        this._messageType = "CharacterCreationResultMessage";
        this.result = result;
        this._isInitialized = true;
    }
};