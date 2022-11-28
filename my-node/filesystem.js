// const { readFile, writeFile } = require("fs");
const { readFile, writeFile } = require("fs").promises;

const start = async () => {
  const first = await readFile("./exampleFolder/awesomeText.txt", "utf8");
  await writeFile(
    "./exampleFolder/successText.txt",
    "I will succeed in all my careers. So help me God!",
    { flag: "a" }
  );
  console.log(first);
};

start();


// const getData = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       if (data) {
//         resolve(data);
//       }
//     });
//   });
// };

// getData("./exampleFolder/second/altText.txt")
//   .then((data) => {
//     console.log(data);
//     getData("./exampleFolder/second/text.txt").then((data) => {
//       console.log(data);
//     });
//     return new Promise((resolve, reject) => {
//       readFile("./exampleFolder/second/newText.txt", "utf-8", (err, result) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(result);
//       });
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .then((data) => {
//     console.log(data);
//   });

// const start = async () => {
//   try {
//     const data = await getData("./exampleFolder/second/newText.txt");
//     const second = await getData("./exampleFolder/newFolderText.txt")
//     return data && second;
//   } catch (err) {
//     return err;
//   }
// };
// start()
//   .then((data) => {
//     console.log(data);
//   })
//   .then((data) => {
//     readFile(`./exampleFolder/second/data.txt`, "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(data);
//     });
//   });
