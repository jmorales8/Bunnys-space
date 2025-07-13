import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { ErrorCheckDB } from '../../components/ErrorHandling/ErrorCheckDB.js';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleString();
}

export let user_db = new sqlite3.Database("./database/Users.db", (err) => {
  ErrorCheckDB(err, "Users", "User Database Connection error");
  user_db.run(
    `CREATE TABLE IF NOT EXISTS Users (
      userID INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
    )`,
    (err) => {
      ErrorCheckDB(err, "Users", "Error creating table")
      user_db.get('SELECT COUNT(*) AS count FROM Users', (err, row) => {
        ErrorCheckDB(err, "Users", "Error checking table count")
        if (row.count === 0) {
          console.log("Users Table is ready. Inserting initial data.");
          const insert = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
          const hashedPassword1 = bcrypt.hashSync('password1', 10);
          const hashedPassword2 = bcrypt.hashSync('password2', 10);

          user_db.run(insert, ['user1', "Bruh@gmail.com", hashedPassword1]);
          user_db.run(insert, ['user2', "ifarted@farted.com", hashedPassword2]);
        }
      })
    }
  )
  user_db.run(
  `CREATE TABLE IF NOT EXISTS Questions (
    questionID INTEGER PRIMARY KEY,
    questionText TEXT,
    questionAsked DATETIME,
    userID INTEGER,
    FOREIGN KEY(userID) REFERENCES Users(userID)
  )`,
  (err) => {
    ErrorCheckDB(err, "Questions", "Error creating table")
    user_db.get('SELECT COUNT(*) AS count FROM Questions', (err, row) => {
      ErrorCheckDB(err, "Questions", "Error checking table count")
      if (row.count === 0) {
        console.log("Questions Table is ready. Inserting initial data.");
        const insert = 'INSERT INTO Questions (questionText, questionAsked, userID) VALUES (?, ?, ?)';
        user_db.run(insert, ['When does the sun explode?', randomDate(new Date(2012, 0, 1), new Date()), 1]);
        user_db.run(insert, ['Who invented the mona lisa?', randomDate(new Date(2012, 0, 1), new Date()), 2]);
      }
    })
  })
  user_db.run(
    `CREATE TABLE IF NOT EXISTS Responses (
      responseID INTEGER PRIMARY KEY,
      responseText TEXT,
      responseGiven DATETIME,
      questionID INTEGER,
      userID INTEGER,
      FOREIGN KEY(questionID) REFERENCES Questions(questionID),
      FOREIGN KEY(userID) REFERENCES Users(userID)
    )`,
    (err) => {
      ErrorCheckDB(err, "Responses", "Error creating table")
      user_db.get('SELECT COUNT(*) AS count FROM Responses', (err, row) => {
        ErrorCheckDB(err, "Response", "Error checking table count")
        if (row.count === 0) {
          console.log("Responses Table is ready. Inserting initial data.");
          const insert = 'INSERT INTO Responses (responseText, responseGiven, questionID, userID) VALUES (?, ?, ?, ?)';
          user_db.run(insert, ['In a gazillion years', randomDate(new Date(2012, 0, 1), new Date()), 1, 1]);
          user_db.run(insert, ['Da vinki?!', randomDate(new Date(2012, 0, 1), new Date()), 1, 2]);
          user_db.run(insert, ['Leonardo Da Vinci', randomDate(new Date(2012, 0, 1), new Date()), 2, 1]);
        }
      })
    });
})
