export default class CharacterSelectedSuccessMessage {
  /**
   * @param {CharacterBaseInformations} infos
   */
    constructor(infos = {}) {
        //constructor
        this._messageType = "CharacterSelectedSuccessMessage";
        this.infos = infos; //Type: CharacterBaseInformations//example: {"_type":"CharacterBaseInformations","id":3432786,"level":1,"name":"Dix-Mariann","entityLook":{"_type":"EntityLook","bonesId":1,"skins":[21,2043],"indexedColors":[33536592,50331596,53058242,69935891,86612674],"scales":[125],"subentities":[]},"breed":2,"sex":true}
        this._isInitialized = true;
    }
};