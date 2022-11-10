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
