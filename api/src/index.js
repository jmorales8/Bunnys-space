import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import { GetTwitchStatus } from './server/GetTwitchStatus.js';
import { profile_db } from './factorydb/Profiledb.js';
import { lore_db } from './factorydb/Loredb.js';
import auth from './middleware/auth.js';
import { user_db } from './factorydb/Usersdb.js';
import questionRoutes from './routes/Questions.js';
import User from './models/Users.js';
import { commission_db } from './factorydb/Commissiondb.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the authentication routes
app.use('/auth', authRoutes);

// Example of a protected route
app.get('/protected', auth, (req, res) => {
  res.send({ message: 'This is a protected route', user: req.user });
});

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!?!' });
});

// Handle GET requests to /api/twitch
app.get('/twitch/livestatus', async (req, res) => {
  try {
    const isLive = await GetTwitchStatus();
    res.json({ isLive });
  } catch (error) {
    console.error('Error getting Twitch status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Handle GET requests to /lore
app.get('/commissions', (req, res) => {
  commission_db.all('SELECT * FROM Commissions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ lore: rows });
  });
});

// Handle GET requests to /profile
app.get('/profile', (req, res) => {
  profile_db.all('SELECT * FROM Profile', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ profiles: rows });
  });
});

// Handle GET requests to /lore
app.get('/lore', (req, res) => {
  lore_db.all('SELECT * FROM Lore', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ lore: rows });
  });
});

app.get('/users', (req, res) => {
  User.getAllInfo((err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send({ users: user})
  })
});

app.get('/questions', (req, res) => {
  user_db.all('SELECT * FROM Questions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ questions: rows });
  });
});

app.get('/responses', (req, res) => {
  user_db.all('SELECT * FROM Responses', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ responses: rows });
  });
});

// Use the authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', questionRoutes);

// Handle all other GET requests not handled before
app.get('*', (req, res) => {
  res.json({ message: "This request doesn't exist" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
