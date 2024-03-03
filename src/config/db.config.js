import mongoose from 'mongoose';
import config from './config.js';
import logger from '../logger/index.js';

export const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongoURI, { dbName: config.mongoDBName });
    logger.info('DB connected');
  } catch (error) {
    logger.info(`Connection to DB failed ${error}`);
  }
};
