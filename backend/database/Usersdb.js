import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { ErrorCheckDB } from '../components/ErrorHandling/ErrorCheckDB.js';

export let user_db = new sqlite3.Database("./Users.db", (err) => {
  ErrorCheckDB(err, "Users", "User Database Connection error");
  console.log("Connected to the Users SQlite db.")

  user_db.run(
    `CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`, (err) => {
      ErrorCheckDB(err, "Users", "Error creating table")

      user_db.get('SELECT COUNT(*) AS count FROM Users', (err, row) => {
        ErrorCheckDB(err, "User", "Error checking table count")
        if (row.count === 0) {
          const insert = 'INSERT INTO Users (username, password) VALUES (?, ?)';
          const hashedPassword1 = bcrypt.hashSync('password1', 10);
          const hashedPassword2 = bcrypt.hashSync('password2', 10);

          user_db.run(insert, ['user1', hashedPassword1]);
          user_db.run(insert, ['user2', hashedPassword2]);
        }
      })
    }
  )
})
