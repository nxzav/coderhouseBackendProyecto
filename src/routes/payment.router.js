import { Router } from 'express';
import { createPreference } from '../controllers/payment.controller.js';

const router = Router();

router.post('/create-preference', createPreference);

export { router as paymentRouter };
