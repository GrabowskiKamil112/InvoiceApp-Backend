const EventEmitter = require("events");
const { emit } = require("process");

const emitter = new EventEmitter();

emitter.on("message", (msg) => {
  console.log("wiadomość: " + msg);
});

emitter.emit("message", "sdfh");
