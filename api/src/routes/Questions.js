// In routes/questions.js
import express from 'express';
import { user_db } from '../factorydb/Usersdb.js';
import auth from '../middleware/auth.js';  // Import your auth middleware

const router = express.Router();

// POST endpoint to create a new question
router.post('/questions', auth, (req, res) => {
  const { questionText } = req.body;
  const userID = req.user.userID;  // Get the user ID from the decoded token

  if (!questionText) {
    return res.status(400).json({ error: 'Question text is required' });
  }

  const sql = 'INSERT INTO Questions (questionText, userID) VALUES (?, ?)';

  user_db.run(sql, [questionText, userID], function(err) {
    if (err) {
      console.error('Error creating question:', err);
      return res.status(500).json({ error: 'Failed to create question' });
    }

    res.status(201).json({
      message: 'Question created successfully',
      questionId: this.lastID,
      questionText,
      userID: userID
    });
  });
});
router.post('/questions/:questionId/responses', auth, (req, res) => {
  const { responseText } = req.body;
  const questionID = parseInt(req.params.questionId, 10); // Convert to number
  const userID = req.user.userID;

  // Add some validation
  if (isNaN(questionID)) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }

  // First verify that the question exists
  user_db.get('SELECT * FROM Questions WHERE questionID = ?', [questionID], (err, question) => {
    if (err) {
      console.error('Error checking question:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Log the question for debugging
    console.log('Found question:', question);

    // Insert the response
    const sql = 'INSERT INTO Responses (responseText, questionID, userID) VALUES (?, ?, ?)';

    user_db.run(sql, [responseText, questionID, userID], function(err) {
      if (err) {
        console.error('Error creating response:', err);
        return res.status(500).json({ error: 'Failed to create response' });
      }

      // Verify the insertion
      user_db.get('SELECT * FROM Responses WHERE responseID = ?', [this.lastID], (err, response) => {
        if (err) {
          console.error('Error verifying response:', err);
        } else {
          console.log('Inserted response:', response);
        }
      });

      res.status(201).json({
        message: 'Response created successfully',
        responseText,
        responseId: this.lastID,
        questionID: questionID,
        userID: userID
      });
    });
  });
});

// Optional: Get questions for current user
router.get('/my-questions', auth, (req, res) => {
  const userID = req.user.id;

  user_db.all('SELECT * FROM Questions WHERE userQuestion = ?', [userID], (err, rows) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }

    res.json({ questions: rows });
  });
});

export default router;

