import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

export let user_db = new sqlite3.Database('./User.db', (err) => {
  if (err) {
    console.log('User Database Connection error: ', err.message);
    throw err;
  } else {
    console.log('Connected to the User SQLite db.');
    user_db.run(
      `CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`,
      (err) => {
        if (!err) {
          console.log('User Table is ready. Inserting initial data.');

          // Check if the table is empty before inserting initial data
          user_db.get('SELECT COUNT(*) AS count FROM User', (err, row) => {
            if (err) {
              console.error('Error checking table count: ', err.message);
              return;
            }

            if (row.count === 0) {
              const insert = 'INSERT INTO User (username, password) VALUES (?, ?)';
              const hashedPassword1 = bcrypt.hashSync('password1', 10);
              const hashedPassword2 = bcrypt.hashSync('password2', 10);
              user_db.run(insert, ['user1', hashedPassword1]);
              user_db.run(insert, ['user2', hashedPassword2]);
            }
          });
        } else {
          console.error('Error creating table: ', err.message);
          return;
        }
      }
    );
  }
});
