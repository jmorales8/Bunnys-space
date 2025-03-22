import sqlite3 from "sqlite3";
import { ErrorCheckDB } from "../../components/ErrorHandling/ErrorCheckDB.js";
import fs from 'fs/promises';
import path from 'path';

const mockImagesPath = path.join('assets', 'mock');

export let commission_db = new sqlite3.Database(
  "./database/Commissions.db",
    (err) => {
    ErrorCheckDB(err, "Commission", "Database Connection error");
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
      (err) => {
        ErrorCheckDB(err, "Commission", "Error creating Commission Table");
        commission_db.get("SELECT COUNT(*) AS count FROM Commissions", async (err, row) => {
          ErrorCheckDB(err, "Commission", "Error checking table count");
          if (row.count === 0) {

            console.log("Commission Table is ready. Inserting initial data.");

            const refImage1 = await fs.readFile(path.join(mockImagesPath, 'pinhead-OC.png'));
            const refImage2 = await fs.readFile(path.join(mockImagesPath, 'Pin_fem_ref.png'));
            const refImage3 = await fs.readFile(path.join(mockImagesPath, 'Pinny_love.png'));
            const poseImage1 = await fs.readFile(path.join(mockImagesPath, 'kratos-on-throne_god-of-war_silo.png'));
            const poseImage2 = await fs.readFile(path.join(mockImagesPath, 'pinny.png'));
            const extraImage = await fs.readFile(path.join(mockImagesPath, 'RobloxScreenShot20240507_012044307.png'));

            let insert = `INSERT INTO
            Commissions (userID, email,
              commissionOC, commissionText,
              refImageOne, refImageTwo, refImageThree,
              poseImageOne, poseImageTwo,
              extraImage)
            Values (?,?,?,?,?,?,?,?,?,?)`;
            commission_db.run(insert, [
              1,
              "iwantacomission@gmail.com",
              "pinhead",
              "I want to see pin using hoola hoops while also bald at the same time",
              refImage1,
              refImage2,
              refImage3,
              poseImage1,
              poseImage2,
              extraImage
            ]);
            commission_db.run(insert, [
              2,
              "pinhead69696969@gmail.com",
              "pinhead",
              "I want him to be surrounded by snow bunnies",
              refImage2,
              null,
              null,
              poseImage1
            ]);
            return;
          }
        });
      }
    );
  }
);
