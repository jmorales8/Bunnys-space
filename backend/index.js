// server/index.js
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js"
import dotenv from "dotenv"
import { GetTwitchStatus } from "./server/GetTwitchStatus.js";
import { profile_db } from "./database/Profiledb.js";
import { lore_db } from "./database/Loredb.js";

const PORT = process.env.PORT || 3001;
// dotenv.config();

const app = express();

app.use(express.json());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!?!" });
});


app.get("/api/twitch", async (req, res) => {
  try {
    const isLive = await GetTwitchStatus();
    res.json({ isLive });
  } catch (error) {
    console.error('Error getting Twitch status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/profile', (req, res) => {
  profile_db.all("SELECT * FROM Profile", [], (err, rows));
})

app.get('/lore', (req, res) => {
  lore_db.all("SELECT * FROM Lore", [], (err, rows));
})
// All other GET requests not handled before will return a message
app.get('*', (req, res) => {
  res.json({ message: "This request doesnt exist" });;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
/*
cd api && yarn start
*/