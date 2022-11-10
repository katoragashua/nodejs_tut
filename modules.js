/*
Modules
In commonJS, every JS file is a module by default.
Modules are encapsulated code.(Only share minimal) 

Built in Modules
These are default modules built into node js
For now we will cover these four built in modules. OS, PATH, FS and HTTP. These modules provide many properties and methods for interactivity in node.

OS(Operating System)
The provides properties and methods for interacting with the server and operating system
*/

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

/* 
PATH
This built in module allows you to interact with file paths
*/
const path = require("path");

// Get you platform specific path seperator
console.log(path.sep);

// Using join() to join and normalize path arguments
const filePath = path.join("/exampleFolder", "second", "text.txt");
console.log(filePath);

// Using basename() to find the base path
const base = path.basename(filePath);
console.log(base);

// Find the absolute path to the file using resolve()
const absolute = path.resolve(__dirname, "exampleFolder", "second", "text.txt");
console.log(absolute);

/* 
File System
This module gives you the ability to interact with the file system: This allows you do things like read files, write files etc
*/
// Synchronous
const { readFileSync, writeFileSync } = require("fs");
const fileContent = readFileSync("./exampleFolder/second/text.txt", "utf8");
console.log(fileContent);

writeFileSync("./exampleFolder/second/altText.txt", `${fileContent} and I am a fullstack developer`, {flag: 'a'})


// Asynchronous
const { readFile, writeFile } = require("fs");
 readFile("./exampleFolder/second/text.txt", "utf-8", (err, result) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(result);
  const first = result 
  readFile("./exampleFolder/second/altText.txt", "utf8", (err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    const second = result
    writeFile("./exampleFolder/newFolderText.txt", `Combination of ${first} and ${second}`,{flag: "a"}, (err, result) => {
      if(err) {
        console.log(err);
        return
      }
      console.log(result)
      return result
    })
  })
 });

