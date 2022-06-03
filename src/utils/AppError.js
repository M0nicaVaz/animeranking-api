class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.type = statusCode;
  }
}

module.exports = AppError;
