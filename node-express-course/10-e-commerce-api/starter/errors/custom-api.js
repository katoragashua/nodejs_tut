class CustomAPIError extends Error {
  // The Constructor takes in a message param which may be a custom message
  constructor(message) {
    // The super method takes only the message from the parent Error class. This enables it always have an error message
    super(message)
  }
}

module.exports = CustomAPIError
