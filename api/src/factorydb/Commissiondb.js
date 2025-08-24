import sqlite3 from "sqlite3";
import { ErrorCheckDB } from "../../components/ErrorHandling/ErrorCheckDB.js";
import fs from "fs/promises";
import path from "path";

const mockImagesPath = path.join("assets", "mock");

export let commission_db = new sqlite3.Database(
  "./database/Commissions.db",
  (err) => {
    ErrorCheckDB(err, "Commission", "Database Connection error");

    // optional: better concurrency
    commission_db.run("PRAGMA journal_mode=WAL;");

    commission_db.run(
      `CREATE TABLE IF NOT EXISTS Commissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        email TEXT NOT NULL,
        commissionOC TEXT NOT NULL,
        commissionText TEXT NOT NULL,
        refImageOne BLOB NOT NULL,
        refImageTwo BLOB,
        refImageThree BLOB,
        poseImageOne BLOB,
        poseImageTwo BLOB,
        extraImage BLOB
      )`,
      (err2) => {
        ErrorCheckDB(err2, "Commission", "Error creating Commission Table");

        // --- Seed once (optional) ---
        commission_db.get(
          "SELECT COUNT(*) AS count FROM Commissions",
          async (err3, row) => {
            ErrorCheckDB(err3, "Commission", "Error checking table count");
            if (!row || row.count !== 0) return;

            console.log("Commission Table is ready. Inserting initial data.");

            try {
              const refImage1 = await fs.readFile(
                path.join(mockImagesPath, "pinhead-OC.png")
              );
              const refImage2 = await fs.readFile(
                path.join(mockImagesPath, "Pin_fem_ref.png")
              );
              const refImage3 = await fs.readFile(
                path.join(mockImagesPath, "Pinny_love.png")
              );
              const poseImage1 = await fs.readFile(
                path.join(mockImagesPath, "kratos-on-throne_god-of-war_silo.png")
              );
              const poseImage2 = await fs.readFile(
                path.join(mockImagesPath, "pinny.png")
              );
              const extraImage = await fs.readFile(
                path.join(
                  mockImagesPath,
                  "RobloxScreenShot20240507_012044307.png"
                )
              );

              const insert = `
                INSERT INTO Commissions
                (userID, email, commissionOC, commissionText,
                 refImageOne, refImageTwo, refImageThree,
                 poseImageOne, poseImageTwo, extraImage)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;

              // row 1 (all columns filled)
              commission_db.run(
                insert,
                [
                  1,
                  "iwantacomission@gmail.com",
                  "pinhead",
                  "I want to see pin using hoola hoops while also bald at the same time",
                  refImage1,
                  refImage2,
                  refImage3,
                  poseImage1,
                  poseImage2,
                  extraImage,
                ],
                (e) =>
                  ErrorCheckDB(e, "Commission", "Error inserting seed row 1")
              );

              // row 2 (some nulls)
              commission_db.run(
                insert,
                [
                  2,
                  "pinhead69696969@gmail.com",
                  "pinhead",
                  "I want him to be surrounded by snow bunnies",
                  refImage2, // required refImageOne
                  null, // refImageTwo
                  null, // refImageThree
                  poseImage1,
                  null, // poseImageTwo
                  null, // extraImage
                ],
                (e) =>
                  ErrorCheckDB(e, "Commission", "Error inserting seed row 2")
              );
            } catch (seedErr) {
              ErrorCheckDB(seedErr, "Commission", "Error seeding data");
            }
          }
        );
      }
    );
  }
);
