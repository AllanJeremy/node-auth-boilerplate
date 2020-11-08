// Internal
const getError = require("./getError");

/** Attaches an error handler to an `async` function
 * @param {Object} res A HTTP resource object. Usually the first parameter of an Express middleware function
 * @param {Function} fn The `async` function to attach the error message to
 * @return A promise with an error handler attached to it
 */
const attachErrorHandler = (res, fn) => {
  //? Intended to be called in middleware
  try {
    return fn.catch((err) => {
      let apiResponse = getError(err.message, err);
      console.log(err);
      console.error(err.message);

      res.status(500).json(apiResponse);
    });
  } catch (err) {
    if (err instanceof TypeError) {
      console.error(
        "The API error handler can only be attached to async functions.\nPlease make sure that the function you are passing as an argument to the error handler is an async function."
      );
    } else {
      console.error(err);
    }
  }
};

//* EXPORTS
module.exports = attachErrorHandler;
