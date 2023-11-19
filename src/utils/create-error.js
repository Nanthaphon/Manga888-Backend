const createError = (message, statusCode) => {
  console.log(message);
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = createError;
