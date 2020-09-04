const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
    info.message = Object.assign(
      {
        message: info.message.message,
        stack: info.message.stack
      },
      info.message
    );
  }

  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack
      },
      info
    );
  }

  return info;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} - ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()]
});

module.exports = logger;
