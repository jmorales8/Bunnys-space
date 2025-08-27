import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log("Register request received:", req.body);

  User.create(username, email, password, (err, userId) => {
    if (err) {
      console.error("Error in User.create:", err);
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).send({ error: "Username already exists." });
      }
      return res.sendStatus(500);
    }
    res.status(201).send({ id: userId, username });
  });
});

router.post("/login", (req, res) => {
  const { userValue, password } = req.body;
  User.findByUsernameOrEmail(userValue, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ error: "Error trying to find the existing User" });
    if (!user || !bcrypt.compareSync(password, user.password))
      return res
        .status(400)
        .send({ error: "Invalid username, email or password." });

    const token = jwt.sign(
      { userID: user.userID, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd, // true on HTTPS
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.send({ user: { userID: user.userID, username: user.username } });
  });
});

router.get('/me', (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(200).send({ authenticated: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ authenticated: true, user: { userID: decoded.userID, username: decoded.username } });
  } catch {
    res.status(200).send({ authenticated: false });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.send({ ok: true });
});

export default router;
