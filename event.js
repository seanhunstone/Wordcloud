var events = require("events");
var eventEmitter = new events.EventEmitter();
//Create an event handler
var myEventHandler = function () {
  console.log("yes I am listening");
}	
//Assign the event handler to an event:
eventEmitter.on("are_you_listening?", myEventHandler);
//Fire the ‘are_you_listening?' event:
eventEmitter.emit("are_you_listening?");