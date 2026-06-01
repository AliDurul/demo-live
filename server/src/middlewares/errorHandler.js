'use strict'

module.exports = (err, req, res, next) => {
  // console.log(res.errStatusCode);
  const statusCode = res.errStatusCode ?? 500;
  res.status(statusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
  });
};