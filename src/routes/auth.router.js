import { Router } from 'express';
import { loginUser, recoverPassword, registerUser, resetPassword, validatePasswordToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/sendRecovery', recoverPassword);
router.get('/reset-password', validatePasswordToken);
router.post('/reset-password', resetPassword);

export { router as authRouter };
