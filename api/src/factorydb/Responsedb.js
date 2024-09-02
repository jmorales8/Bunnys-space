import sqlite3 from "sqlite3";
import { ErrorCheckDB } from "../../components/ErrorHandling/ErrorCheckDB.js";

export let response_db = new sqlite3.Database("./database/Response.db", (err) => {
  ErrorCheckDB(err, "Response", "Response Database Connection error");
  console.log("Connected To the Response SQLite db");
  response_db.run(
    `CREATE TABLE IF NOT EXISTS Response (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      response TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES Userdb(id)
    )`,
    (err) => {
      ErrorCheckDB(err, "Response", "Error creating table");
      response_db.get("SELECT COUNT(*) AS count FROM Response", (err, row) => {
        ErrorCheckDB(err, "Response", "Error checking table count");
        if (row.count === 0) {
          console.log("Response Table is ready. Inserting initial data.");
          let insert = "INSERT INTO Response (userId, response) VALUES (?, ?)";
          response_db.run(insert, [2, "This is your mom!"]);
          response_db.run(insert, [1, "Nah me haveing a 6th toe is realer then elmo"]);
          response_db.run(insert, [1, "Out buying milk"]);
          response_db.run(insert, [1, "They stopped streaming because of you"]);
          return;
        }
      });
    }
  );
});
