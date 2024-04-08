import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const verifyToken = (req = request, res = response, next) => {
  const token = (req?.cookies) ? req.cookies['token'] : null;
  console.log(token);
  if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });

  try {
    const { _id, email, role } = jwt.verify(token, config.JWTKey);
    req._id = _id;
    req.email = email;
    req.role = role;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ ok: false, msg: 'Token no valido' });
  }

  next();
};

export const isAdmin = (req = request, res = response, next) => {
  if (!(req.role === 'admin' || req.role === 'premium'))
    return res.status(403).json({ ok: false, msg: 'Permisos insuficientes' });
  next();
};
