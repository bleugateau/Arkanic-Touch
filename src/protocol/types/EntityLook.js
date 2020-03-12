export default class EntityLook {
    constructor(skins = [], colors = [], subEntities = [], scales = [125], bonesId = 1) {
        //constructor
        this._type = "EntityLook";
        this.bonesId = bonesId;
        this.skins = skins;
        this.indexedColors = colors;
        this.scales = scales;
        this.subentities = subEntities;
    }
};