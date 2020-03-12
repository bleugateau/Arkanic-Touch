export default class GameServerInformations {
    constructor(id = 0, name = "", status = 0, completion = 0, charactersCount = 0) {
        //constructor
        this._type = "GameServerInformations";
        this.id = id;
        this.status = status;
        this.completion = completion;
        this.isSelectable = true;
        this.charactersCount = charactersCount;
        this.date = 0;
        this._name = name;
        this._gameTypeId = 0;
    }
};