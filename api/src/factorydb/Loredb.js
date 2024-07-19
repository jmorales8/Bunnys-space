import sqlite3 from "sqlite3";
import { ErrorCheckDB } from "../../components/ErrorHandling/ErrorCheckDB.js";

export let lore_db = new sqlite3.Database("./database/Lore.db", (err) => {
  ErrorCheckDB(err, "Lore", "Database Connection error");
  console.log("Connected to the Lore SQLite db")
  lore_db.run(
    `CREATE TABLE IF NOT EXISTS Lore (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      section INTEGER,
      location TEXT,
      character TEXT,
      background TEXT
    )`,
    (err) => {
      ErrorCheckDB(err, "Lore", "Error creating Lore Table");
      lore_db.get("SELECT COUNT(*) AS count FROM Lore", (err, row) => {
        ErrorCheckDB(err, "Lore", "Error checking table count");
        if (row.count === 0) {
          console.log("Lore Table is ready. Inserting initial data.");
          let insert = "INSERT INTO Lore (text, section, location, character, background) Values (?,?,?,?,?)";
          lore_db.run(insert, ["This is just some text for something", 1, "Your moms house", "BUNBUN", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Id porta nibh venenatis cras. Lorem mollis aliquam ut porttitor leo a. Id faucibus nisl tincidunt eget. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue."])
          lore_db.run(insert, ["This is just some text for something ELSE", 2, "Your DADS house", "BUNBUM", "DEEZ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Id porta nibh venenatis cras. Lorem mollis aliquam ut porttitor leo a. Id faucibus nisl tincidunt eget. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congueEEZ."])
          return;
        }
      }
    );
  })
});
