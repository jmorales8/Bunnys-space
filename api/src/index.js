import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { GetTwitchStatus } from "./server/GetTwitchStatus.js";
import { profile_db } from "./factorydb/Profiledb.js";
import { lore_db } from "./factorydb/Loredb.js";
import auth from "./middleware/auth.js";
import { user_db } from "./factorydb/Usersdb.js";
import questionRoutes from "./routes/Questions.js";
import User from "./models/Users.js";
import { commission_db } from "./factorydb/Commissiondb.js";
import { discord_db } from "./factorydb/Discorddb.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the authentication routes
app.use("/auth", authRoutes);

// Example of a protected route
app.get("/protected", auth, (req, res) => {
  res.send({ message: "This is a protected route", user: req.user });
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!?!" });
});

// Handle GET requests to /api/twitch
app.get("/twitch/livestatus", async (req, res) => {
  try {
    const isLive = await GetTwitchStatus();
    res.json({ isLive });
  } catch (error) {
    console.error("Error getting Twitch status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle GET requests to /lore
app.get("/commissions", (req, res) => {
  commission_db.all("SELECT * FROM Commissions", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ commissions: rows });
  });
});

// Handle GET requests to /discord
app.get("/discord", (req, res) => {
  discord_db.all(
    "SELECT serverID, title, description, joinLink FROM Discord",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ Discord: rows });
    }
  );
});

app.get("/discord/img/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT img FROM Discord WHERE serverID = ?";
  discord_db.get(sql, id, (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!row || !row.img) {
      return res.sendStatus(404);
    }
    res.set("Content-Type", "image/png");
    res.send(row.img);
  });
});

// Handle GET requests to /profile
app.get("/profile", (req, res) => {
  profile_db.all("SELECT * FROM Profile", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ profiles: rows });
  });
});

// Handle GET requests to /lore
app.get("/lore", (req, res) => {
  lore_db.all("SELECT * FROM Lore", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ lore: rows });
  });
});

app.get("/users", (req, res) => {
  User.getAllInfo((err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send({ users: user });
  });
});

app.get("/Q-A", (req, res) => {
  User.getQuestionsAndAnswers((err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ Q_A: data });
    }
  });
});

app.delete("/user", (req, res) => {
  const { userValue } = req.body;
  console.log("/hit");
  if (userValue.includes("@")) {
    user_db.run(
      "DELETE FROM Users WHERE email = ?",
      [userValue],
      (err, row) => {
        if (err) {
          console.error("Error deleting user by email:", err);
        }
      }
    );
  } else {
    user_db.run(
      "DELETE FROM Users WHERE username = ?",
      [userValue],
      (err, row) => {
        if (err) {
          console.error("Error deleting user by username:", err);
        }
      }
    );
  }
  res.send({ "Deleted: ": userValue });
});

// Use the authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", questionRoutes);

// Handle all other GET requests not handled before
app.get("*", (req, res) => {
  res.json({ message: "This request doesn't exist" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
