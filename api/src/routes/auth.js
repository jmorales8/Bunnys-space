import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log("Register request received:", req.body);

  User.create(username, email, password, (err, userId) => {
    if (err) {
      console.error("Error in User.create:", err);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).send({ error: 'Username already exists.' });
      }
      return res.sendStatus(500);
    }
    res.status(201).send({ id: userId, username });
  });
});

router.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  User.findByUsername(username, email, (err, user) => {
    if (err) {
      return res.status(500).send({ error: 'Error trying to find the existing User' });
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log("Invalid username or password.");
      return res.status(400).send({ error: 'Invalid username or password.' });
    }
    console.log("username:", username)
    console.log("user:", user)
    console.log("user id: ", user.userID,)
    const token = jwt.sign({ userID: user.userID, username: user.username }, process.env.JWT_SECRET);
    res.send({ token });
  });
});

export default router;
