import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    req.logger.fatal('FATAL ERROR');
    req.logger.error('Error');
    req.logger.warning('Warning');
    req.logger.info('Info');
    req.logger.http('HTTP');
    req.logger.debug('Debug');
  
    res.send({ ok: 'ok' });
});

export { router as loggerRouter };
