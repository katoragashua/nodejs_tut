/*OS(Operating System)
This module provides properties and methods for interacting with the server and operating system
*/

// It is important to note that when you import a module, you actually invoke it.

const os = require("os");

// Method to get the user information
const user = os.userInfo();
console.log(user);

// Method to get the systems uptime information in seconds(i.e. how long the system has been running in seconds)
const uptime = os.uptime();
console.log(uptime);

// An info object of your OS

const currentOs = {
  osName: os.type(),
  release: os.release(),
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
};

console.log(currentOs);

console.log(os.homedir())
console.log(os.userInfo());