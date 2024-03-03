import express from 'express';
import passport from 'passport';

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

function authToken() {
  return passport.authenticate('jwt', { session: false });
}

router.get('/', homeView);
router.get('/realtimeproducts', auth, rtpView);
router.get('/chat', auth, chatView);
router.get('/carts', auth, cartsView);
router.get('/carts/:cid', auth, singleCartView);
router.get('/login', sessionIsActive, loginGet);
router.get('/loginjwt', sessionIsActive, loginjwtView);
router.get('/register', sessionIsActive, registerGet);
router.get('/profile', auth, profileView);
router.get('/sendRecovery', sessionIsActive, recoverView);

export default router;
