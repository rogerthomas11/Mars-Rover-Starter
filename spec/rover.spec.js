const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let testRover = new Rover(123);
  let commands = [new Command('MOVE', 1), new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
  let myMessage = new Message('name', commands);
  let testMessage = testRover.receiveMessage(myMessage);

  it("constructor sets position and default values for mode and generatorWatts", function(){
    expect(testRover.position).toBe(1);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });
  it("response returned by receiveMessage contains the name of the message", function(){
    expect(testMessage.name).toBe(myMessage.name);
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    expect(testMessage.results.length).toBe(myMessage.commands.length);
  });
  it("responds correctly to the status check command", function(){
    expect(testMessage.results[2]).toEqual({completed: true, roverStatus: testRover.getStatus()});
  });
  it("responds correctly to the mode change command", function(){
    expect(testMessage.results[1]).toEqual({completed: true});
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    testRover.mode = 'LOW_POWER';
    let newCommands = [new Command('MOVE', 1)];
    let newMessage = new Message('name', newCommands);
    let newTestMessage = testRover.receiveMessage(newMessage);
    expect(newTestMessage.results[0]).toEqual({completed: false});
  });
  it("responds with the position for the move command", function(){
    expect(testMessage.results[0]).toEqual({completed: true});
  });
});
