import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("login", { failureRedirect: "/login" }),
  async (req, res) => {
    if(!req.user) return res.status(400).send("Invalid credentials");

    req.session.user = req.user;
    return res.redirect("/profile");
  }
);

router.post("/register", passport.authenticate("register", {failureRedirect: "/register"}), async (req, res) => {
  return res.redirect("/login");
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

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Logout error");

    return res.redirect("/");
  });
});

export {router as sessionRouter};
