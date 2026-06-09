// Request logging middleware
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, 'requests.log');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;

  res.send = function(data) {
    const duration = Date.now() - startTime;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?._id || 'anonymous'
    };

    // Log to file (production)
    if (process.env.NODE_ENV === 'production') {
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    } else {
      // Log to console (development)
      const statusColor = res.statusCode >= 400 ? '❌' : '✅';
      console.log(
        `${statusColor} [${logEntry.timestamp}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
      );
    }

    return originalSend.call(this, data);
  };

  next();
};

const errorLogger = (err, req, res, next) => {
  const errorEntry = {
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query,
    ip: req.ip,
    userId: req.user?._id || 'anonymous'
  };

  // Log to file
  const errorLogFile = path.join(logsDir, 'errors.log');
  fs.appendFileSync(errorLogFile, JSON.stringify(errorEntry) + '\n');

  // Log to console (always log errors)
  console.error('❌ ERROR:', errorEntry);

  next(err);
};

module.exports = {
  requestLogger,
  errorLogger
};