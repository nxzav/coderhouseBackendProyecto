import { Router } from "express";
import UserModel from "../models/user.model.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (!user) return res.status(404).send("<h1>User Not Found</h1>");

  req.session.user = user;
  return res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.send("<h1>Password do not match</h1>");

  const user = req.body;
  await UserModel.create(user);

  return res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Logout error");

    return res.redirect("/");
  });
});

export default router;