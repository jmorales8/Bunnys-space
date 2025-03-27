import sqlite3 from 'sqlite3';
import { ErrorCheckDB } from '../../components/ErrorHandling/ErrorCheckDB.js';
import fs from 'fs/promises';
import path from 'path';

const mockImagesPath = path.join('assets', 'mock');

export let discord_db = new sqlite3.Database("./database/Discord.db", (err) => {
  ErrorCheckDB(err, "Discord", "User Database Connection error");
  discord_db.run(
    `CREATE TABLE IF NOT EXISTS Discord (
      serverID INTEGER PRIMARY KEY,
      title TEXT UNIQUE,
      description TEXT,
      img BLOB,
      joinLink TEXT
    )`,
    (err) => {
      ErrorCheckDB(err, "Discord", "Error creating table")
      discord_db.get('SELECT COUNT(*) AS count FROM Discord', async (err, row) => {
        ErrorCheckDB(err, "Discord", "Error checking table count")
        if (row.count === 0) {
          console.log("Discord Table is ready. Inserting initial data.");
          const discordIMG1 = await fs.readFile(path.join(mockImagesPath, 'bunnyL.png'));
          const insert = 'INSERT INTO Discord (title, description, img, joinLink) VALUES (?, ?, ?, ?)';
          discord_db.run(insert, [
            "The Bunzone",
            "Tomboy unfiltered Ink Succubus Rabbit Unhinged talk and art is my specialty! Come join me ~",
            discordIMG1,
            "aS2HvqyrmD"
          ])
        }
      })
    }
  )
})
