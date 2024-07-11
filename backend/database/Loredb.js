import sqlite3 from "sqlite3";
export let lore_db = new sqlite3.Database("./Lore.db", (err) => {
  if(err) {
    console.log("Lore Database Connection error: ", err.message);
    throw err;
  } else {
    console.log("Connected to the Lore SQLite db")
    lore_db.run(
      `CREATE TABLE IF NOT EXISTS Lore (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        section INTERGER
      )`,
      (err) => {
        if(!err) {
          console.log("Lore Table is ready. Inserting initial data.");

          let insert = "INSERT INTO Lore (text, section) Values (?,?)";
          lore_db.run(insert, ["This is just some text for something", 1])
          lore_db.run(insert, ["This is just some text for something ELSE", 2])
        } else {
          console.log("Error creating Lore Table: ", err.message);
          return;
        }
      }
    );
  }
});
