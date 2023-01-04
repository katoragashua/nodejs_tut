const {readFileSync, writeFileSync} = require('fs');
const path = require('path');

writeFileSync(path.join(__dirname, 'text.txt'), "The man behind the mask", {encoding: 'utf8'});

const text = readFileSync(path.join(__dirname, 'text.txt'), {encoding: 'utf8'});
console.log(text);

/*File System
This module gives you the ability to interact with the file system: This allows you do things like read files, write files etc
*/
// Synchronous
const fileContent = readFileSync("./exampleFolder/second/text.txt", "utf8");
console.log(fileContent);

writeFileSync("../exampleFolder/second/altText.txt", `${fileContent} and I am a fullstack developer`, {flag: 'a'})



