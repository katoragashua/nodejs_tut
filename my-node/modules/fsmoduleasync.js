// Asynchronous
/* This asynchronous method takes a callback as its last argument */
const { readFile, writeFile, existsSync, mkdir, rmdir, unlinkSync, unlink } = require("fs");
const path = require("path");

readFile(
  path.join(__dirname, "text.txt"),
  { encoding: "utf8" },
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    return data;
  }
);

readFile(
  "../exampleFolder/second/text.txt",
  { encoding: "utf-8" },
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    const first = result;
    readFile("../exampleFolder/second/altText.txt", "utf8", (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      const second = result;
      writeFile(
        path.join(__dirname, "async.txt"),
        `Combination of ${first} and ${second}`,
        { flag: "a" },
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          return result;
        }
      );
    });
  }
);

/* We can also create directories and remove them and also delete files. Examples Below */

// We can check if a diectory or file already exists using the fs.existsSync() function. This is however synchronous

if(existsSync("./text.txt" )) {
  console.log("File already exists")
}

// Creating a folder
if(!existsSync("./newFolder")) {
  mkdir("./newFolder", (err) => {
    console.log("Folder created");
  })
}

// Deleting a folder
if(existsSync("./newFolder")) {
  rmdir("./newFolder", (err) => {
    if(err) throw err
    console.log("Folder deleted")
  })
}

// Deleting files
if(existsSync("./modules/text2.txt")){
  unlink("./modules/text2.txt", (err) => {
    if(err) throw err
    console.log("File deleted");
  })
}