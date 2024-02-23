import { createLogger, format, transports } from 'winston';

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white',
  },
};

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

export const devLogger = () => {
  return createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(format.timestamp(), customFormat),
      }),
      new transports.File({
        filename: './errors.log',
        level: 'error',
        format: format.combine(format.timestamp(), customFormat),
      }),
    ],
  });
};
