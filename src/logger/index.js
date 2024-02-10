import config from '../config/config.js';
import { devLogger } from './dev.logger.js';
import { proLogger } from './pro.logger.js';

let logger = null;

config.nodeENV !== 'production'
  ? (logger = devLogger())
  : (logger = proLogger());

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `[${req.method}] ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

export default logger;
