import sqlite3 from "sqlite3";
import { ErrorCheckDB } from "../../components/ErrorHandling/ErrorCheckDB.js";

export let question_db = new sqlite3.Database("./database/Questions.db", (err) => {
  ErrorCheckDB(err, "Questions", "Questions Database Connection error");
  console.log("Connected To the Questions SQLite db");
  question_db.run(
    `CREATE TABLE IF NOT EXISTS Questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      question TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES Userdb(id)
    )`,
    (err) => {
      ErrorCheckDB(err, "Questions", "Error creating table");
      question_db.get("SELECT COUNT(*) AS count FROM Questions", (err, row) => {
        ErrorCheckDB(err, "Questions", "Error checking table count");
        if (row.count === 0) {
          console.log("Questions Table is ready. Inserting initial data.");
          let insert = "INSERT INTO Questions (userId, question) VALUES (?, ?)";
          question_db.run(insert, [1, "wtf is this?"]);
          question_db.run(insert, [2, "is elmo real?"]);
          question_db.run(insert, [2, "where is my dad?"]);
          question_db.run(insert, [2, "when is my favorite streamer back on?"]);
          return;
        }
      });
    }
  );
});
