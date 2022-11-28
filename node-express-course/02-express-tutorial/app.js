// console.log('Express Tutorial')
const { createServer } = require("http");
const { readFileSync, readFile } = require("fs");

// const homePage = readFileSync("./navbar-app/index.html");
// const homeStyles = readFileSync("./navbar-app/styles.css");
// const homeLogic = readFileSync("./navbar-app/browser-app.js");
// const homeLogo = readFileSync("./navbar-app/logo.svg");

// const server = createServer();
// server.on("request", (req, res) => {
//   const { url } = req;
//   switch (url) {
//     case "/":
//       res.writeHead(200, "OK", { "content-type": "text/html" });
//       res.write(homePage);
//       res.end();
//       break
//     case "/styles.css":
//       res.writeHead(200, "OK", { "content-type": "text/css" });
//       res.write(homeStyles);
//       res.end();
//       break
//     case "/browser-app.js":
//       res.writeHead(200, "OK", { "content-type": "text/javascript" });
//       res.write(homeLogic);
//       res.end();
//       break
//     case "/logo.svg":
//       res.writeHead(200, "OK", { "content-type": "image/svg+xml" });
//       res.write(homeLogo);
//       res.end();
//       break
//   }
// });

// server.listen(5000, () => {
//   console.log("Listening on port 5000");
// });

// const express = require("express");
// const path = require("path");
// // const file = readFile("./index.html", "utf8", (err, result) => {
// //   if(err)return
// //   return result
// // });

// const app = express();

// // Set up a static middleware.
// app.use(express.static("./public")); // We can use this method to serve up simple web applications/sites.
// // Alternatively, we can comment the code below which is supposed to send the index.html to be served because, the public folder already has index.html which will always be the root. And index.html contains paths to other static files/assets.

// // app.get("/", (req, res) => {
// //   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// // });
// // Another way we can do the above is by adding to static assets/SSR

// app.listen(5500, () => {
//   console.log("Server listening on port 5500");
// });

const express = require("express");
const { products, people } = require("./data");
const app = express();

// Middlewares for traditional approach
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));

// Middleware for javascript approach
app.use(express.json()); // Adding this middleware gives you access to the incoming request body.

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// Functionality for JavaScript approach
app.post("/api/people", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (!name.trim()) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter a name." });
  }
  res.status(200).json({ success: true, person: name });
});

// Functionality for Traditional approach
app.post("/login", (req, res) => {
  // Note that if your server is hosted somewhere else, you will have to provide a link for its. However, for this we use /login since its hosted here. Same thing will apply in the HTML.
  console.log(req.body);
  const { name } = req.body;
  if (name.trim()) {
    return res.status(200).send(`<h1>Welcome, ${name}</h1>`);
  }
  res.status(401).send("<h1>Please enter your credentials</h1>");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
