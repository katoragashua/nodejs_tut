/* Events is a class and we can create a new instance(Object) from it as seen below. This instance object has many methods but the ones' we are most interested in for now are the on() and the emit() methods. The on() method basically registers take the event you are interested in as a parameter as well as callback that will be fired when the event occurs.*/

const EventEmmitter = require("events");
const customEmmiter = new EventEmmitter()
customEmmiter.on("response", () => {
    console.log("Event fired")
})

customEmmiter.on("response", () => {
  console.log("Data received");
});

customEmmiter.emit("response")

/* It is important to note that order matters here. We must first subscribe to an event or events before we can emit then.*/