const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "Kator".toLocaleLowerCase()) {
    req.user = { name: "Kator", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
