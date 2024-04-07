// import { Router } from 'express';
// import passport from 'passport';
// import { generateToken } from '../utils.js';

// const router = Router();

// router.post('/login',
//   passport.authenticate('login', { session: false }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     if (!token) return res.status(401).send('Invalid credentials');

//     return res.cookie('coderCookie', token, { secure: true, httpOnly: true })
//       .send({ status: 'success', message: 'Authentication successful' });
//   }
// );

// export default router;
