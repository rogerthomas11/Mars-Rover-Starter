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
      let results = new Array();
      for (const i in commands) {
         let command = commands[i];
         if(command.commandType === 'MOVE') {
            if(this.mode === 'LOW_POWER'){
               results.push({completed: false})
            } else {
               this.position += command.value;
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
   // receiveMessage(message){
   //    let results = [message.name, message.commands];
   //    let roverStatus = `mode: ${this.mode}, generatorWatts: ${this.generatorWatts}, position: ${this.position}`;
   //    if(message.commands === 'MOVE') {
   //       this.position = position + message.commands.value;
   //       return {completed: true};      
   //    } else if(message.commands === 'STATUS_CHECK') {
   //       return {completed: true, roverStatus: roverStatus};
   //    } else if(message.commands === 'MODE_CHANGE') {
   //       this.mode = 'LOW_POWER';
   //       return {completed: true};
   //    }
   // }
}

module.exports = Rover;

// let rover = new Rover(100);
// let commands = [
//    new Command('MOVE', 4321),
//    new Command('STATUS_CHECK'),
//    new Command('MODE_CHANGE', 'LOW_POWER'),
//    new Command('MOVE', 3579),
//    new Command('STATUS_CHECK')
// ];
// let message = new Message('TA power', commands);
// let response = rover.receiveMessage(message);

// console.log(rover);
// console.log;