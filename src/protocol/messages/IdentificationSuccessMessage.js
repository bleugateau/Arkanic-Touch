export default class IdentificationSuccessMessage {
    constructor(login = "", nickname = "", accountId = 0, secretQuestion = "", hasConsoleRight = false, hasRights = true) {
        //constructor
        this._messageType = "IdentificationSuccessMessage";
        this.login = login;
        this.nickname = nickname;
        this.accountId = accountId;
        this.communityId = 0;
        this.hasRights = hasRights;
        this.secretQuestion = secretQuestion;
        this.subscriptionEndDate = 0;
        this.wasAlreadyConnected = false;
        this.accountCreation = 0;
        this.hasConsoleRight = hasConsoleRight;
        this._isInitialized = true;
        this._groupFlags = "fr";
        this._applicationName = "";
    }
};