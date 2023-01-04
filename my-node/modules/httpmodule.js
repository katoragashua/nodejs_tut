const http = require("http")
// const server = http.createServer((req, res) => {
//     console.log(req.method, req.url)
//     res.write("Welcome to the home page!")
//     res.end()
// })
// const port = 8080
// server.listen(port, () => console.log("Server listening on port "  + port))



// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("Welcome to the Home page.");
//     res.end();
//   }
//   if (req.url === "/about") {
//     res.write("Welcome to the About page. Here is a brief history about us.");
//     res.end();
//   }

//   if (req.url === "/contact") {
//     res.write("Contact us at 09090904546");
//     res.end();
//   }

//   res.end(`<h2>Page not found</h2>`);
// });

// server.listen(3000);


// const http = require("http");

// console.time();


const server = http.createServer((req, res) => {
  console.log("Request event");
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

// server.listen(8080);
// We can also add a callback to the listen method
server.listen(8080, () => {
  console.log("Server listening on port 8080");
});

/*
Please do note that the server extends the net.server class which in turn extends the EventEmmitter class as so has access to methods on the parent class. As seen below, we can also create a server as such
*/

// const {createServer} = require("http");
// const server = createServer()

// server.on("request", (req, res) => {
//   res.write("Hello, world!");
//   res.end();
// });

// server.listen(5000, ()=> {
//   console.log("Listening on port 5000")
// })