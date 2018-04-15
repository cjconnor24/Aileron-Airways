export abstract class Guid {

    constructor(){}

    protected uuidv4():string {
    
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, uuidv4 = c == 'x' ? r : (r & 0x3 | 0x8);
          return uuidv4.toString(16);
        });
      }

}
