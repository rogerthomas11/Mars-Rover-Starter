const Message = require("./message");

class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

    receiveMessage(message){
      return {
         name: message.name, 
         results: this.getCommandResults(message.commands)
      }
   }

   getCommandResults(commands){
      let results = [];
      for (let i = 0; i < commands.length; i++) {
         let command = commands[i];
         if(command.commandType === 'MOVE') {
            if(this.mode === 'LOW_POWER'){
               results.push({completed: false})
            } else {
               this.position = command.value;
               results.push({completed: true});
            }
         } 
         else if(command.commandType === 'STATUS_CHECK') {
            results.push({completed: true, roverStatus: this.getStatus()});
         } 
         else if(command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            results.push({completed: true});
         }
      }
      return results;
   }

   getStatus(){
      return {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
      }
   }
}

module.exports = Rover;