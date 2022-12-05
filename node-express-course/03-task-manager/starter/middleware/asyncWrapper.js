// We set this up so that we can get rid of the redundant try catch blocks in our controllers.


const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        next(err)
    }
  };
};

module.exports = asyncWrapper