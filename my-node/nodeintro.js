/* Node Js is an environment to run JavaScript outside of the browser. It was built in 2008 by Ryan Dahl and was built on top of chromes v8 engine. Every browser has an engine: a tool than turns JavaScript code into machine code. Node Js is essentially used for building server side applications. 

Node has no access to browser APIs e.g, fetch, DOM, geolocation etc.
Node has access to file system.
Node is based on versions.
Access to modules by default.
Node uses common Js

To get Node to evaluate our JavaScript code we have two options. 
1. REPL (Read Eval Print Loop)
2. CLI (Command Line Interface): Running our app in Node

Globals
Just as we have the window object that is accessible from anywhere in client side js apps, we also have a concept called Globals that can be accessed from anywhere in your node applications. So no matter how complex the application gets or how nested it becomes, you'll always have access to these variables.

Example of Globals are: 
__dirname : path to a current directory.
__filname : file name.
require : a function to use modules(commonJS).
module : info about a current module(file).
process : info about the environment where the program is being executed.
*/
require("./names")
// console.log(__dirname);
// console.log(__filename);
// console.log(require);
// console.log(module);
// console.log(process);
// console.log(process.env.COMPUTERNAME);
console.log(global)