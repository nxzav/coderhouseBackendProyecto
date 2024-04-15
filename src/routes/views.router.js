import express from 'express';

import {
  cartsView,
  chatView,
  homeView,
  loginGet,
  registerGet,
  rtpView,
  singleCartView,
  profileView,
  loginjwtView,
  recoverView,
} from '../controllers/views.controller.js';
import { auth, isAdminOrPremium, isUser, sessionIsActive } from '../middleware/views.middleware.js';
// import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', homeView);
router.get('/realtimeproducts', [auth, isAdminOrPremium], rtpView);
router.get('/chat', [auth, isUser], chatView);
router.get('/carts', auth, cartsView);
router.get('/carts/:cid', auth, singleCartView);
router.get('/login', sessionIsActive, loginGet);
router.get('/loginjwt', sessionIsActive, loginjwtView);
router.get('/register', sessionIsActive, registerGet);
router.get('/profile', auth, profileView);
router.get('/sendRecovery', sessionIsActive, recoverView);

export default router;
