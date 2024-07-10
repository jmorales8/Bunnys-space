import express from "express"
import Users from "../server/Users"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body
  Users.create(username, password, (err, userId) => {
    if (err) {
      return res.status(400).send({ error: "Username already exists" })
    }
    res.status(201).send({ id: userId. username });
  })
})

router.post("login", (req, res) => {
  const { username, password } = req.body;
  Users.findByUsername(username, (err, user) => {
    if(err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ error: "Invalid username or password" })
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
    res.send({ token });
  })
})

export default router;
