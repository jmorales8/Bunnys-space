import { user_db } from '../factorydb/Usersdb.js';
import bcrypt from 'bcryptjs';

const User = {
  create: (username, email, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedEmail = bcrypt.hashSync(email, 10);
    console.log("Creating user:", username);
    user_db.run(
      'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
      [username, hashedEmail, hashedPassword],
      function (err) {
        if (err) {
          console.error("Error inserting user:", err);
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  },

  findByUsername: (username, email, callback) => {
    console.log("Finding user:", username);
    user_db.get('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], (err, row) => {
      if (err) {
        console.error("Error finding user:", err);
        return callback(err);
      }
      callback(err, row);
    });
  },
};

export default User;
