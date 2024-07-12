import { user_db } from '../database/Usersdb.js';
import bcrypt from 'bcryptjs';

const User = {
  create: (username, password, callback) => {
    user_db.get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (row) {
        callback(new Error('Username already exists'), null);
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      user_db.run('INSERT INTO User (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, this.lastID);
        }
      });
    });
  },

  findByUsername: (username, callback) => {
    user_db.get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
      callback(err, row);
    });
  }
};

export default User;
