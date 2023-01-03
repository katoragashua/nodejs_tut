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
