// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error.statusCode = 400;
    error.message = 'Resource not found';
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = 'Duplicate field value entered';
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.statusCode = 400;
    error.message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.statusCode = 401;
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.statusCode = 401;
    error.message = 'Token expired';
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Server Error';

  // Logging
  if (statusCode === 500) {
    console.error(`❌ [${new Date().toISOString()}] ERROR:`, {
      status: statusCode,
      message: message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
  } else {
    console.warn(`⚠️  [${new Date().toISOString()}] CLIENT ERROR:`, {
      status: statusCode,
      message: message,
      path: req.path
    });
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;