const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./Profile.db', (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite db.');
    db.run(`CREATE TABLE IF NOT EXISTS Profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT
      bio text,
      age integer
    )`, (err) => {
      if (!err) {
        console.log('Table is ready. Inserting initial data.');

        let insert = 'INSERT INTO Profile (bio, age) VALUES (?,?)'
        db.run(insert, ["These are my fat nuts", 30]);
        db.run(insert, ["I cant wait to eat ass", 22]);
      }
    }
    )
  }
})

module.exports = db;
