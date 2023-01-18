const {createServer} = require("http");
const {readFileSync, createReadStream} = require("fs")


// const server = createServer((req, res) => {
//   const file = readFileSync("exampleFolder/bigFile.txt", {encoding: "utf8"})
//   res.end(file)
// });

// server.listen(8080, () => {
//   console.log("listening on port 8080")
// })

const server = createServer();
server.on("request", (req, res) => {
  const fileStream = createReadStream("./exampleFolder/bigFile.txt", "utf-8")
  fileStream.on("open", (data) => {
    fileStream.pipe(res)
  })
  fileStream.on("error", (err) => {
    res.end(err)
  })

})

server.listen(8080, () => {
  console.log("Server listening on port 8080")
})

// const {createReadStream} = require("fs");

// const stream = createReadStream("./exampleFolder/largeFile.txt", {highWaterMark: 80000, encoding: "utf8"});

// stream.on("data", (result) => {
//   console.log(result);
// });

 

