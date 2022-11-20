/*At its basic, Stream are used in Node.js to read and write sequentially. When we have to handle data, for example streaming data(i.e., a continous source) or a large file, streams come in very handy. 
We have four types of streams: 

Writeable- used to write data sequentially.
Readable- used to read data sequentially.
Duplex- used to read and write data sequentially.
Transform- where data can be modified or tra when writing or reading sequentially.

Streams also extend the EventEmmiter class and so has access to methods on that class. eg on()
*/
const { createReadStream } = require("fs");
const { createServer } = require("http");

const server = createServer((req, res) => {
  const fileStream = createReadStream("./exampleFolder/bigFile.txt", {
    encoding: "utf8",
  });
  fileStream.on("open", () => {
    fileStream.pipe(res);
  });
  fileStream.on("error", (error) => res.end(error));
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
