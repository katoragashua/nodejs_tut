/* 
PATH
This built in module allows you to interact with file paths
*/
const path = require("path");

// Get you platform specific path seperator
console.log(path.sep);

// Using join() to join and normalize path arguments
const filePath = path.join("../exampleFolder", "second", "text.txt");
console.log(filePath);

// Using basename() to find the base path
const base = path.basename(filePath);
console.log(base);

// Find the absolute path to the file using resolve(). path.resolve() returns an absolute path. It takes a sequence of paths as arguments.
const absolute = path.resolve(__dirname, "exampleFolder", "second", "text.txt");
console.log(absolute);

console.log(path.normalize(__dirname));

const basePath = path.basename(__dirname, );
console.log(basePath);
