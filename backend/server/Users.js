import { user_db } from "../database/Usersdb.js";
import bcrypt from 'bcryptjs'

const Users = {
  create: (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    user_db.run("INSERT INTO Users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
      callback(err, this.lastID)
    })
  },
  findByUsername: (username, callback) => {
    user_db.get("SELECT * FROM Users WHERE username = ?", [username], (err, row) => {
      callback(err, row)
    })
  }
}

export default Users;