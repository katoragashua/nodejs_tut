const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next(); // You can either pass it to the next function or terminate as seen in the comment below
  // res.send("Hello World!")
};

module.exports = logger