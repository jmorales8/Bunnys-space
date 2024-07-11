import sqlite3 from "sqlite3";
export let profile_db = new sqlite3.Database("./Profile.db", (err) => {
  if (err) {
    console.log("Profile Database Connection error: ", err.message);
    throw err;
  } else {
    console.log("Connected to the Profile SQLite db.");
    profile_db.run(
      `CREATE TABLE IF NOT EXISTS Profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bio TEXT,
      age INTEGER
    )`,
      (err) => {
        if (!err) {
          console.log("Profile Table is ready. Inserting initial data.");

          let insert = "INSERT INTO Profile (bio, age) VALUES (?,?)";
          profile_db.run(insert, ["These are my fat nuts", 30]);
          profile_db.run(insert, ["I cant wait to eat ass", 22]);
        } else {
          console.error("Error creating table: ", err.message);
          return;
        }
      }
    );
  }
});
