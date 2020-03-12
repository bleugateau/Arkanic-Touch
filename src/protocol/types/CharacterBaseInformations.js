export default class CharacterBaseInformations {
    constructor(id = 0, level = 1, name = "", entityLook = null, breed = 0, sex = false) {
        //constructor
        this._type = "CharacterBaseInformations";
        this.id = id;
        this.level = level;
        this.name = name;
        this.entityLook = entityLook;
        this.breed = breed;
        this.sex = sex;
    }
};