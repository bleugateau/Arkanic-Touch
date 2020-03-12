export default class AccountCapabilitiesMessage {
  constructor(accountId = 0, breedVisible = 32767, breedAvaible = 32767) {
    //constructor
    this._messageType = "AccountCapabilitiesMessage"; 
    this.accountId = accountId;
    this.tutorialAvailable = true;
    this.breedsVisible = breedVisible;
    this.breedsAvailable = breedAvaible;
    this.status = 0;  
    this.accountRights = [];  
    this._isInitialized = true; 
    this._accountRightsMap = {}; //example: {}
  }
};