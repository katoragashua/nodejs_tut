const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to the Home page.");
    res.end();
  }
  if (req.url === "/about") {
    res.write("Welcome to the About page. Here is a brief history about us.");
    res.end();
  }

  if (req.url === "/contact") {
    res.write("Contact us at 09090904546");
    res.end();
  }

  res.end(`<h2>Page not found</h2>`);
});

server.listen(3000);


const http = require("http");

console.time();
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