// server/index.js
import express from "express";
import { GetTwitchStatus } from "./server/GetTwitchStatus.js"

const PORT = process.env.PORT || 3001;
const app = express();

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