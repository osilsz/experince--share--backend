

class ApiError extends Error {
  constructor(statusCode, message = 'something went wrong', status,
    errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.data = null;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }


}

export default ApiError