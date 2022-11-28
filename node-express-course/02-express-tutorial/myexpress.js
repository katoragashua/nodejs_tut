 // const express = require("express");
// const path = require("path");
// const { products, people } = require("./data");

// const app = express();

// // app.use(express.static("./public"))

// app.get("/", (req, res) => {
//   // res.sendFile(path.join(__dirname,"./index.html"))
//   res
//     .status(200)
//     .send("<h1>Home Page</h1><a href='/api/products'>Got to API</a>");
// });

// app.get("/api/products", (req, res) => {
//   // const newProducts = products.map(product => {
//   //   return {
//   //     id: product.id,
//   //     name: product.name,
//   //     image: product.image,
//   //   }
//   // })

//   // or

//   const newProducts = products.map((product) => {
//     const { id, name, image } = product;
//     return { id, name, image };
//   });
//   res.json(newProducts);
// });

// /* Route Params */
// app.get(`/api/products/:productID`, (req, res) => {
//   console.log(req.params);
//   const { productID } = req.params;
//   const product = products.find(
//     (product) => productID === product.id.toString()
//   );
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).send("<h1>Product does not exist</h1>");
//   }
// });

// /* URL Params or Query string params */
// app.get("/api/products/v1/search", (req, res) => {
//   console.log(req.query);
//   let sortedProducts = [...products];
//   const { query, per_page } = req.query;

//   if (query) {
//     sortedProducts = sortedProducts.filter((product) =>
//       product.name.startsWith(query)
//     );
//   }

//   if (per_page) {
//     sortedProducts = sortedProducts.slice(0, Number(per_page));
//   }

//   if (sortedProducts.length < 1) {
//     return res.status(200).json({success: true, message: 'No products matched your search', data: []})
//   }
//   res.status(200).json(sortedProducts);
// });

// app.all("*", (req, res) => {
//   res.send("<h2>Cannot find file</h2>");
// });

// app.listen(4500, () => {
//   console.log("Server listening on port 4500");
// });

// const express = require("express");

// const app = express();

// request => middleware => response

// const logger = require("./logger");
// const authorize = require("./authorize");

// // app.use("/api", logger); //You can also specify path and any url with their base path matching the path applies the middleware. If the path is not specified, it applies to all requests.
// app.use( [logger, authorize]);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

// app.get("/api/items/v1", (req, res) => {
//   res.send("About Page");
// });

// app.get("/api/products/v1", (req, res) => {
//   res.send("About Page");
//   console.log(req.user);
// });

// app.listen(5000, () => {
//   console.log("Server listening on port 5000");
// });

const express = require("express");
const { products, people } = require("./data");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require("morgan");

// Attaching Middlewares
// Note that order matters and app.use() must be called before the routes
/* app.use() takes:
- A middleware function.
- A series of middleware functions (separated by commas).
- An array of middleware functions.
- A combination of all of the above. */

app.use("/",morgan("tiny")) // Note that it applies to any route that has the base path in it eg. /users, /about, etc. So a path of "/api" will apply to any route with the "/api" prefix or base path.

// If it takes no path, it applies to all routes.
// eg app.use(logger)


// Declare all routes about before route parameters
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.get("/api/v1/products", authorize,(req, res) => { 
  // We can add a middleware to the specific route we want by placing it between the path and the callback function as seen above. 
  const allProducts = products.map((product) => {
    const { id, name, image, price } = product;
    return { id, name, image, price };
  });
  res.status(200).json(allProducts);
});

// Route Parameters (used for routing/searching)
app.get("/api/v1/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not exist!");
  }
  res.status(200).json(singleProduct);
});

app.get("/api/v1/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  const { productID, reviewID } = req.params;
  const allProducts = products.map((product, index) => ({
    ...product,
    reviews: {
      a: "Good review for product " + index,
      b: "Great review for product " + index,
      c: "Excellent review for product " + index,
    },
  }));
  const singleReview = allProducts.find(
    (product) => product.id === Number(productID)
  );
  const { reviews } = singleReview;
  if (!reviews[reviewID]) {
    return res.status(404).send("Review not found!");
  }
  res.status(200).json(reviews[reviewID]);
});

// Query Strings or URL parameters (This does sorting/filtering)

app.get("/api/v1/search/products", (req, res) => {
  console.log(req.query);
  let sortedProducts = [...products];
  const { per_page, query } = req.query;

  // The order of query algorithms is also very important
  if (query) {
    sortedProducts = sortedProducts.filter((product) =>
      // product.name.includes(query)
      product.name.startsWith(query)
    );
  }

  if (per_page) {
    sortedProducts = sortedProducts.slice(0, Number(per_page));
  }

  if(sortedProducts.length > 1) {
    return res.status(200).json({ success: true, data: [], message: "Your url parameters didn't match any product"})
  }

  return res.status(200).send(sortedProducts);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
