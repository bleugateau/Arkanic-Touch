export default class InventoryContentMessage {
  /**
   * @param {ObjectItem[]} objects
   * @param {number} kamas
   */
    constructor(objects = [], kamas = 0) {
        //constructor
        this._messageType = "InventoryContentMessage";
        this.objects = objects; //Type: ObjectItem
        this.kamas = kamas;
        this._isInitialized = true;
    }
};