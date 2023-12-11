import express from "express";
import CartModel from "../models/cart.model.js";

import { cartsView, chatView, homeView, loginGet, registerGet, rtpView, singleCartView, profileView } from "../controllers/views.controller.js";

const router = express.Router();

// Middleware
function sessionIsActive(req, res, next) {
  if (req.session?.user) return res.redirect('/profile');
  return next();
}

function auth(req, res, next) {
  if(req.session?.user) return next();
  return res.redirect('/login');
}

router.get("/", homeView);
router.get("/realtimeproducts", auth, rtpView);
router.get("/chat", auth, chatView);
router.get("/carts", auth, cartsView);
router.get("/carts/:cid", auth, singleCartView);
router.get("/login", sessionIsActive, loginGet);
router.get("/register", sessionIsActive, registerGet);
router.get("/profile", auth, profileView);

export default router;