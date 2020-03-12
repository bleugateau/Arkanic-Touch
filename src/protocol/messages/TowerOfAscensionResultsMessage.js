export default class TowerOfAscensionResultsMessage {
    constructor(steps = []) {
        //constructor
        this._messageType = "TowerOfAscensionResultsMessage";
        this.steps = steps;
        this._isInitialized = true;
    }
};