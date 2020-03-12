export default class CharacterDeletionRequestMessage {
  constructor() {
    //constructor
    this.type = "CharacterDeletionRequestMessage";
    this.characterId = null; 
    this.secretAnswerHash = null; 
  }
};