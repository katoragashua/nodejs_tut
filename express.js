/* 
Express is a mininal and flexible webapp framework that makes developing webapps and apis faster and easier. 
Express has many methods, but the ones we are most interested in are:
- get(): Gets and returns data or reads data.
- post(): Inserts data
- put(): Updates data
- delete(): Deletes data
- all(): All works with all of them
- use(): This is responsible for middleware
- listen(): Listening

listen() works just like the http listen method
*/
const express = require("express");
const app = express();
app.get("/", function (req, res) {
  console.log(this);
  res.send("<h1>Home Page</h1>");
});

app.get("/api/", function (req, res) {
    res.send({"name": "Kator"})
})

app.all("*", function (req, res) {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

console.log(__dirname)

// const express = require("express");
// // const file = readFileSync("./index.html", "utf8");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// app.listen(6000, () => {
//   console.log("Server listening on port 6000");
// });
