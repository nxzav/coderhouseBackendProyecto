import { request, response } from 'express';
import { ProductService, MessageService, CartService, UserService } from '../repositories/index.js';
// import CartModel from '../models/cart.model.js';

export const homeView = async (req = request, res = response) => {
  try {
    if (req.session.user) {
      const { first_name, last_name } = req.session?.user;
      const result = await ProductService.getProducts({ ...req.query });
      result.user_name = `${first_name}`;
      console.log({ result });
      return res.render('home', result);
    } else {
      const result = await ProductService.getProducts({ ...req.query });
      console.log({ result });
      return res.render('home', result);
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
  const carts = await CartService.getCarts();
  console.log({ carts });

  return res.render('carts', { title: 'Carts', style: 'cart.css', carts });
};

export const singleCartView = async (req = request, res = response) => {
  try {
    // const cart = await CartModel.findOne({ _id: req.params.cid }).lean().exec();
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

  res.render('profile', { user, style: 'profile.css' });
};

export const loginGet = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect('/profile');
  }
  return res.render('login', { style: 'session.css' });
};

export const registerGet = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect('/profile');
  }
  return res.render('register', { style: 'session.css' });
};

export const loginjwtView = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect('/profile');
  }
  return res.render('loginjwt', { style: 'session.css' });
};
