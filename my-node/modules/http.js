const http = require("http");
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.write("Welcome to my application server Home page!");
      res.end();
      break;
    case "/users":
      res.write("Welcome to my application server Users page!");
      res.end();
      break;
    case "/groups":
      res.write("Welcome to my application server Groups!");
      res.end();
      break;
    default:
      res.write("Cant find the specified path on server!");
      res.end();
  }
});

const port = 8080;
server.listen(8080, () => {
  console.log("Server listening on " + port);
});

// const {createServer} = require("http");
// const server = createServer()

// server.on("request", (req, res) => {
//    console.log("Request event");
//   switch (req.url) {
//     case "/":
//       res.write("Welcome to my application server Home page!");
//       res.end();
//       break;
//     case "/users":
//       res.write("Welcome to my application server Users page!");
//       res.end();
//       break;
//     case "/groups":
//       res.write("Welcome to my application server Groups!");
//       res.end();
//       break;
//     default:
//       res.write("Cant find the specified path on server!");
//       res.end();
//   }
// });

// server.listen(5000, ()=> {
//   console.log("Listening on port 5000")
// })
