import sqlite3 from "sqlite3";
import { ErrorCheckDB } from "../components/ErrorHandling/ErrorCheckDB.js";

export let lore_db = new sqlite3.Database("./Lore.db", (err) => {
  ErrorCheckDB(err, "Lore", "Database Connection error")
  console.log("Connected To the Lore SQLite db")
  lore_db.run(
    `CREATE TABLE IF NOT EXISTS Lore (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      section INTERGER
    )`,
    (err) => {
      ErrorCheckDB(err, "Lore", "Error creating Lore Table")
      console.log("Lore Table is ready. Inserting initial data.");
      let insert = "INSERT INTO Lore (text, section) VALUES (?, ?)";
      lore_db.run(insert, ["This is just some text", 1])
      lore_db.run(insert, ["This is another piece of text", 2])
      return;
    }
  )
})
