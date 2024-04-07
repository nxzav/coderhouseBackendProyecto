import { Router } from 'express';
import logger from '../logger/index.js';

const router = Router();

router.get('/', (req, res) => {
  logger.fatal('FATAL ERROR');
  logger.error('Error');
  logger.warning('Warning');
  logger.info('Info');
  logger.http('HTTP');
  logger.debug('Debug');

  res.send({ ok: 'ok' });
});

export { router as loggerRouter };
