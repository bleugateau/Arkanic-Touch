export default class CharactersListMessage {
    /**
     * @param {CharacterBaseInformations[]}  characters
     */
    constructor(characters = []) {
        //constructor
        this._messageType = "CharactersListMessage";
        this.hasStartupActions = false;
        this.characters = characters; //Type: CharacterBaseInformations
        this._isInitialized = true;
    }
};