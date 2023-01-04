// Asynchronous
/* This asynchronous method takes a callback as its last argument */
const { readFile, writeFile } = require("fs");
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
