import sqlite3 from "sqlite3"

export let user_db = new sqlite3.Database("./Users.db", (err) => {
  if (err) {
    console.log("Users Database Connection error: ", err.message);
    throw err;
  } else {
    console.log("Connected to the User SQLite db.")
    user_db.run(
      `CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT
      username TEXT UNIQUE
      password TEXT
      )`,
      (err) => {
        if(!err) {
          console.log("Users Table is ready. Inserting initial data.");
          let insert = "INSERT INTO Users (username, password) VALUES (?, ?)";
          const bcrypt = require("bcryptjs");
          const hashedPassword1 = bcrypt.hashSync("password1", 10);
          const hashedPassword2 = bcrypt.hashSync("password2", 10);
          user_db.run(insert, ["user1", hashedPassword1]);
          user_db.run(insert, ["user2", hashedPassword2]);
        } else {
          console.error("Error creating table: ", err.message);
          return;
        }
      }
    )
  }
})
