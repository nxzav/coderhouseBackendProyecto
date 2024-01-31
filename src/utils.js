import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import config from './config/config.js';
// dirname
export default __dirname;

// Bcrypt
export const createHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const passHash = bcrypt.hashSync(password, salt);
  return passHash;
};

export const isValidPassword = (password, userPassword) => {
  const passValid = bcrypt.compareSync(password, userPassword);
  return passValid;
};

// JWT
export const generateToken = (user) => {
  try {
    return jwt.sign({...user}, config.JWTKey, {expiresIn: '1h'});
  } catch (error) {
    console.log(error)
    throw error;
  }
};
