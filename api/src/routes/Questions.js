// In routes/questions.js
import express from 'express';
import { user_db } from '../factorydb/Usersdb.js';
import auth from '../middleware/auth.js';  // Import your auth middleware

const router = express.Router();

// POST endpoint to create a new question
router.post('/questions', auth, (req, res) => {
  const { questionText } = req.body;
  const userID = req.user.id; // Get user ID from decoded token

  if (!questionText) {
    return res.status(400).json({ error: 'Question text is required' });
  }

  const sql = 'INSERT INTO Questions (questionText, userQuestion) VALUES (?, ?)';

  user_db.run(sql, [questionText, userID], function(err) {
    if (err) {
      console.error('Error creating question:', err);
      return res.status(500).json({ error: 'Failed to create question' });
    }

    res.status(201).json({
      message: 'Question created successfully',
      questionId: this.lastID,
      questionText,
      userQuestion: userID
    });
  });
});

// POST endpoint to create a new response to a question
router.post('/questions/:questionId/responses', auth, (req, res) => {
  const { responseText } = req.body;
  const { questionId } = req.params;

  if (!responseText) {
    return res.status(400).json({ error: 'Response text is required' });
  }

  // First verify that the question exists
  user_db.get('SELECT * FROM Questions WHERE questionID = ?', [questionId], (err, question) => {
    if (err) {
      console.error('Error checking question:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Insert the response
    const sql = 'INSERT INTO Responses (responseText, questionResponse) VALUES (?, ?)';

    user_db.run(sql, [responseText, questionId], function(err) {
      if (err) {
        console.error('Error creating response:', err);
        return res.status(500).json({ error: 'Failed to create response' });
      }

      res.status(201).json({
        message: 'Response created successfully',
        responseId: this.lastID,
        responseText,
        questionResponse: questionId
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

