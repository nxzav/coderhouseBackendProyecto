import jwt from 'jsonwebtoken';
import { CartService, UserService } from '../repositories/index.js';
import {
  createHash,
  generateToken,
  isValidPassword,
  sendEmail,
} from '../utils.js';
import logger from '../logger/index.js';
import config from '../config/config.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (!user) return res.status(400).json({ msg: 'Wrong email or password' });
    const passwordIsValid = isValidPassword(password, user.password);
    if (!passwordIsValid)
      return res.status(400).json({ msg: 'Wrong email or password' });

    const { _id, first_name, last_name, role } = user;
    const token = generateToken({ _id, first_name, last_name, role });

    return res.json({ status: 'success', user, token });
  } catch (error) {
    logger.error('Log in error :', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    req.body.password = createHash(req.body.password);
    logger.debug(req.body.password);
    const newCart = await CartService.createCart();
    logger.debug(newCart);
    req.body.cart = newCart._id;
    logger.debug(req.body.cart);
    const user = await UserService.registerUser(req.body);
    const { _id, first_name, last_name, email, role } = user;
    const token = generateToken({ _id, first_name, last_name, email, role });
    logger.debug({ token });

    return res.json({ status: 'success', user, token });
  } catch (error) {
    logger.error('Register user error :', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserService.getUserByEmail(email);
  if (!user)
    return res.status(400).json({ success: false, msg: 'Invalid user' });

  const token = generateToken({ email });
  console.log({ token });

  const recoverURL = `http://localhost:8080/api/auth/reset-password?token=${token}`;

  sendEmail(email, recoverURL);

  return res.json({ success: true });
};

export const validatePasswordToken = async (req, res) => {
  try {
    const { token } = req.query;
    const { email } = jwt.verify(token, config.JWTKey);

    return res.json({ success: true, token, email });
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ success: false, msg: 'Invalid token' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const { email } = jwt.verify(token, config.JWTKey);

    const user = await UserService.getUserByEmail(email);
    console.log(user);
    if (!user) return res.status(400).json({ success: false, msg: 'Invalid email'});

    const validPassword = isValidPassword(password, user.password);
    if (validPassword) return res.status(400).json({ success: false, msg: 'Password must be different'});

    user.password = createHash(password);
    user.save();

    return res.json({ success: true, msg: 'Password has been updated'});

  } catch (error) {
    logger.error('resetPassword error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};
