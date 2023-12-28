// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// All other GET requests not handled before will return a message
app.get('*', (req, res) => {
  res.json({ message: "This request doesnt exist" });;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});