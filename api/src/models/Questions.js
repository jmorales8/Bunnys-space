import { question_db } from '../factorydb/Questionsdb.js';

const Questions = {
  create: (callback) => {
    question_db.run("INSERT INTO Questions (userId, question) VALUES (?, ?)", [userId, question], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.lastID);
      }
    });
  }
};

export default Questions;