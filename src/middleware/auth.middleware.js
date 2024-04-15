import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import logger from '../logger/index.js';

export const verifyToken = (req = request, res = response, next) => {  
  try {
    const token = req?.cookies ? req.cookies['token'] : null;
    if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });
    const { _id, email, role } = jwt.verify(token, config.JWTKey);
    req._id = _id;
    req.email = email;
    req.role = role;
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ ok: false, msg: 'Token no valido' });
  }

  next();
};

export const isAdminOrPremium = (req = request, res = response, next) => {
  if (!(req.role === 'admin' || req.role === 'premium'))
    return res.status(403).json({ ok: false, msg: 'Permisos insuficientes' });
  return next();
};

export function isUserOrPremium(req, res, next) {
  console.log({ userOrPremium: req.role });
  if (req.role === 'user' || req.role === 'premium') return next();
  return res.status(403).json({ success: false, msg: 'You are not authorized to access this service' });
}
