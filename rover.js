const Message = require("./message");

class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

    receiveMessage(message){
      let results = [message.name, message.commands];
      // let roverStatus = `${Rover.mode}, ${Rover.generatorWatts}, ${Rover.position}`;
      // if(message.name === "STATUS_CHECK") {
      //    return results.push(roverStatus);
      // } 
      return results;
   }
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

