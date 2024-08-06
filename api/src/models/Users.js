import { user_db } from '../factorydb/Usersdb.js';
import bcrypt from 'bcryptjs';

const User = {
  create: (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Creating user:", username);
    user_db.run(
      'INSERT INTO Users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) {
          console.error("Error inserting user:", err);
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  },

  findByUsername: (username, callback) => {
    console.log("Finding user:", username);
    user_db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error("Error finding user:", err);
        return callback(err);
      }
      callback(null, row);
    });
  }
};

export default User;
