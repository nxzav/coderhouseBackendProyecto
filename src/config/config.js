import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
  mongoURI: process.env.MONGO_URI,
  mongoDBName: process.env.MONGO_DB_NAME,
  secretSession: process.env.SECRET_SESSION,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  JWTKey: process.env.JWT_KEY,
  nodeENV: process.env.NODE_ENV,
  passEmail: process.env.PASS_EMAIL,
  passUser: process.env.USER_EMAIL,
};
