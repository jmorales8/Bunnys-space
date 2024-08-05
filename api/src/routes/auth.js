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
      if (err.message === 'Username already exists') {
        return res.status(400).send({ error: 'Username already exists.' });
      }
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    res.status(201).send({ id: userId, username });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error("Error in User.findByUsername:", err);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log("Invalid username or password.");
      return res.status(400).send({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.send({ token });
  });
});

export default router;
