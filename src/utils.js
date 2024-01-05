import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import 'dotenv/config';

export default __dirname;

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateToken = (user) => {
  return jwt.sign(user, process.env.JWTKey, { expiresIn: '1h' });
};

// export const generateToken = (user) => {
//   const token = jwt.sign({user}, process.env.JWTKey, {expiresIn: '24h'});

//   return token;
// }
