const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on("userJoined", () => console.log("User has joined."));
myEmitter.emit("userJoined");

myEmitter.on("message", (msg) => console.log(`User message: ${msg}`));
myEmitter.emit("message", "Hello Guys!");

myEmitter.on("userLeft", () => console.log(`User has left.`));
myEmitter.emit("userLeft");
