import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import config from './config/config.js';
import logger from './logger/index.js';
// dirname
export default __dirname;

// Bcrypt
export const createHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const passHash = bcrypt.hashSync(password.toString(), salt);
  return passHash;
};

export const isValidPassword = (password, userPassword) => {
  const passValid = bcrypt.compareSync(password, userPassword);
  return passValid;
};

// JWT
export const generateToken = (user) => {
  try {
    return jwt.sign({ ...user }, config.JWTKey, { expiresIn: '1h' });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Email
export const sendEmail = async (email, url) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.passUser,
        pass: config.passEmail,
      },
    });

    await transporter.sendMail({
      from: 'MyStore <noezh.25@gmail.com>',
      to: `${email}`,
      subject: 'Recover account',
      html: templateEmail(email, url),
    });
  } catch (error) {
    logger.error('Send email error: ', error);
  }
};

const templateEmail = (email, url) => {
  const title = 'Recover account for MyStore Ecommerce';
  const link = url;

  return (
  `
    <table id="wrapper" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="font-family: sans-serif">
                <h1>${title}</h1>

                <p>Hello,</p>

                <p>Enter in the next link to reset your password. If you didn't request this change, ignore this email.</p>
                <p><a href="${link}">${link}</a></p>
                
                <p><a href="${link}" class="button" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a></p>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
  )
}
