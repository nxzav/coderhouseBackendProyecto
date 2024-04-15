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
// import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Middleware
function sessionIsActive(req, res, next) {
  if (req.session?.user) return res.redirect('/profile');
  return next();
}

function auth(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect('/login');
}

function isAdminOrPremium(req, res, next) {
  if (req.session?.user.role === 'admin' || req.session?.user.role === 'premium')
    return next();
  return res.status(403).json({ success: false, msg: 'You are not authorized to access this service' });
}

function isUser(req, res, next) {
  if (req.session?.user.role === 'user' || req.session?.user.role === 'premium')
    return next();
  return res.status(403).json({ success: false, msg: 'Admins can not access the chat' });
}

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
