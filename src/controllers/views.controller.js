import { request, response } from 'express';
import {
  ProductService,
  MessageService,
  CartService,
} from '../repositories/index.js';

export const homeView = async (req = request, res = response) => {
  try {
    if (req.session.user) {
      const { first_name, last_name } = req.session?.user;
      const result = await ProductService.getProducts({ ...req.query });
      result.user_name = `${first_name}`;
      console.log({ result });
      return res.render('home', { result, title: 'Home' });
    } else {
      const result = await ProductService.getProducts({ ...req.query });
      console.log({ result });
      return res.render('home', { result, title: 'Home' });
    }
  } catch (error) {
    throw error;
  }
};

export const rtpView = async (req = request, res = response) => {
  return res.render('realTimeProducts', {
    title: 'Real Time Products',
    style: 'rtp.css',
  });
};

export const chatView = async (req = request, res = response) => {
  const messages = await MessageService.getMessages();

  return res.render('chat', { messages, title: 'Chat', style: 'chat.css' });
};

export const cartsView = async (req = request, res = response) => {
  const userCartID = req.session?.user.cart;
  const cart = await CartService.getCartById(userCartID);
  console.log({ cart });

  return res.render('carts', { cart, title: 'Carts', style: 'cart.css' });
};

export const singleCartView = async (req = request, res = response) => {
  try {
    const cart = await CartService.getCartById(req.params.cid);
    console.log(cart);
    return res.render('cart', {
      cart: cart,
      title: 'Single Cart',
      style: 'cart.css',
    });
  } catch (error) {
    console.log(error);
    res.send('Error to show product');
  }
};

export const profileView = async (req = request, res = response) => {
  const user = req.session.user;

  res.render('profile', { user, title: 'Profile', style: 'profile.css' });
};

export const loginGet = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect('/profile');
  }
  return res.render('login', { title: 'Login', style: 'session.css' });
};

export const registerGet = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect('/profile');
  }
  return res.render('register', { title: 'Register', style: 'session.css' });
};

export const loginjwtView = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect('/profile');
  }
  return res.render('loginjwt', { title: 'Login JWT', style: 'session.css' });
};
