import { user_db } from "../factorydb/Usersdb.js";
import bcrypt from "bcryptjs";

const User = {
  create: (username, email, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedEmail = bcrypt.hashSync(email, 10);
    console.log("Creating user:", username);
    user_db.run(
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
      [username, hashedEmail, hashedPassword],
      function (err) {
        if (err) {
          console.error("Error inserting user:", err);
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  },

  findByUsername: (username, callback) => {
    console.log("Finding user by username:", username);
    user_db.get(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      (err, row) => {
        if (err) {
          console.error("Error finding user:", err);
          return callback(err);
        }
        callback(err, row);
      }
    );
  },
  findByEmail: (email, callback) => {
    console.log("Finding user by email:", email);
    user_db.get("SELECT * FROM Users WHERE email = ?", [email], (err, row) => {
      if (err) {
        console.error("Error finding user:", err);
        return callback(err);
      }
      callback(err, row);
    });
  },
  getQuestionsAndAnswers(callback) {
  user_db.all(
    `SELECT
      Questions.questionID,
      Questions.questionText,
      Questions.questionAsked,
      askers.userID AS questionUserID,
      askers.username AS questionUsername,

      Responses.responseID,
      Responses.responseText,
      Responses.responseGiven,
      Responses.userID AS responseUserID,
      responders.username AS responseUsername

    FROM Questions
    JOIN Users AS askers ON Questions.userID = askers.userID
    LEFT JOIN Responses ON Responses.questionID = Questions.questionID
    LEFT JOIN Users AS responders ON Responses.userID = responders.userID`,
    [],
    (err, rows) => {
      if (err) {
        callback(err);
        return;
      }

      const questionsMap = {};

      for (const row of rows) {
        if (!questionsMap[row.questionID]) {
          questionsMap[row.questionID] = {
            userId: row.questionUserID,
            username: row.questionUsername,
            questionId: row.questionID,
            questionText: row.questionText,
            questionAsked: row.questionAsked,
            responses: [],
          };
        }

        if (row.responseID) {
          questionsMap[row.questionID].responses.push({
            responseText: row.responseText,
            responseId: row.responseID,
            responseUsername: row.responseUsername, // this should now work
            responseGiven: row.responseGiven,
          });
        }
      }

      callback(null, { questions: Object.values(questionsMap) });
    }
  );
},
  getAllInfo: (callback) => {
    user_db.all(
      `
      SELECT
        Users.*,
        Questions.questionID,
        Questions.questionText,
        Responses.responseID,
        Responses.responseText,
        Responses.userID as responseUserID,
        Responses.questionID as responseQuestionID  /* Added this line */
      FROM Users
      LEFT JOIN Questions ON Users.userID = Questions.userID
      LEFT JOIN Responses ON Responses.userID = Users.userID
      `,
      [],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        const formatted = rows.reduce((acc, row) => {
          if (!acc[row.userID]) {
            acc[row.userID] = {
              userID: row.userID,
              username: row.username,
              email: row.email,
              password: row.password,
              questions: [],
              responses: [],
            };
          }

          // Add questions where user is the author
          const existingQuestion = acc[row.userID].questions.find(
            (q) => q.questionID === row.questionID
          );
          if (row.questionID && !existingQuestion) {
            acc[row.userID].questions.push({
              questionID: row.questionID,
              questionText: row.questionText,
            });
          }

          // Add responses where user is the responder
          const existingResponse = acc[row.userID].responses.find(
            (r) => r.responseID === row.responseID
          );
          if (
            row.responseID &&
            !existingResponse &&
            row.responseUserID === row.userID
          ) {
            acc[row.userID].responses.push({
              responseID: row.responseID,
              questionID: row.responseQuestionID, // Use responseQuestionID instead of questionID
              responseText: row.responseText,
            });
          }

          return acc;
        }, {});
        callback(err, Object.values(formatted));
      }
    );
  },
};

export default User;
