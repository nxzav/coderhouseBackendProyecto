import jwt from 'jsonwebtoken';
import { CartService, UserService } from '../repositories/index.js';
import {
  createHash,
  generateRecoveryToken,
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

    if (!user) return res.status(400).json({success: false, msg: 'Wrong email or password' });
    const passwordIsValid = isValidPassword(password, user.password);
    if (!passwordIsValid)
      return res.status(400).json({success: false, msg: 'Wrong email or password' });

    const { _id, first_name, last_name, role } = user;
    const token = generateToken({ _id, first_name, last_name, role });

    res.cookie('token', token, { httpOnly: true });

    return res.json({ success: true, user, token });
  } catch (error) {
    logger.error('Log in error: ', error);
    return res.status(500).json({success: false, msg: 'Internal Server Error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const userExists = UserService.getUserByEmail(req.body.email);
    if (userExists) return res.status(409).json({ success: false, msg: 'User already exists' });

    req.body.password = createHash(req.body.password);
    const newCart = await CartService.createCart();
    req.body.cart = newCart._id;

    const user = await UserService.registerUser(req.body);
    const { _id, first_name, last_name, email, role } = user;
    const token = generateToken({ _id, first_name, last_name, email, role });
    logger.debug({ token });

    return res.json({ success: true, user, token });
  } catch (error) {
    logger.error('Register user error: ', error);
    return res.status(500).json({success: false, msg: 'Internal Server Error' });
  }
};

export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user)
      return res.status(404).json({ success: false, msg: 'User not found' });
  
    const token = generateRecoveryToken({ email });
    console.log({ token });
  
    const recoverURL = `http://localhost:8080/api/auth/reset-password?token=${token}`;
  
    sendEmail(email, recoverURL);
  
    return res.json({ success: true, msg: 'Recovery link sent to email' });
  } catch (error) {
    logger.error('Recover password error: ', error);
    return res.status(500).json({success: false, msg: 'Internal Server Error' });
  }
};

export const validatePasswordToken = async (req, res) => {
  try {
    const { token } = req.query;
    const { email } = jwt.verify(token, config.JWTKey);
    if (email) return res.render('resetPassword', { token, style: 'session.css' });
  } catch (error) {
    logger.error('Validate password error: ', errorerror);
    return res.status(401).json({ success: false, msg: 'Invalid token' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, msg: 'Password fields do not match'});
    }
    const { email } = jwt.verify(token, config.JWTKey);

    const user = await UserService.getUserByEmail(email);
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
