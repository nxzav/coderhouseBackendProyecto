import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils.js";
import logger from "../logger/index.js";

const router = Router();

router.post("/login", passport.authenticate("login", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      if (!req.user) return res.status(400).send('Invalid credentials');
      const { _id, first_name, last_name, role } = req.user;
      const token = generateToken({ _id, first_name, last_name, role });
      res.cookie('token', token, { httpOnly: true });

      req.session.user = req.user;
      return res.json(token);
    } catch (error) {
      logger.error('login error: ', error);
      return res
        .status(500)
        .json({ success: false, msg: 'Internal server error' });
    }
  }
);

router.post("/register", passport.authenticate("register", {failureRedirect: "/register"}), async (req, res) => {
  try {
    return res.redirect("/login");
  } catch (error) {
    logger.error('register error: ', error);
    return res.status(500).json({success: false, msg: 'Internal server error' });
  }
});

router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get("/githubcallback",
  passport.authenticate("github", {failureRedirect: "/error"}),
  (req, res) => {
    console.log("Callback: ", req.user);

    req.session.user = req.user;
    console.log("User session setted");

    res.redirect("/");
  }
);

router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send({ status: 'success', payload: req.user });
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy((err) => {
    if (err) return res.send('Logout error');

    return res.redirect('/');
  });
});

export { router as sessionRouter };
