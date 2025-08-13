// routes/commissions.js
import express from "express";
import fileUpload from "express-fileupload";
import { commission_db } from "../factorydb/Commissiondb.js";

const router = express.Router();

// Middleware for file uploads (only for this router)
router.use(
  fileUpload({
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB per file
    abortOnLimit: true,
    createParentPath: true,
  })
);

// GET /commissions -> list commissions (without blobs)
router.get("/", (req, res) => {
  commission_db.all(
    `SELECT id, userID, email, commissionOC, commissionText FROM Commissions`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ commissions: rows });
    }
  );
});

// POST /commissions -> add a new commission
router.post("/", (req, res) => {
  try {
    const { email, commissionOC, commissionText, userID } = req.body;

    if (!email || !commissionOC || !commissionText) {
      return res
        .status(400)
        .json({ error: "email, commissionOC, and commissionText are required" });
    }

    const pick = (name) => {
      const f = req.files?.[name];
      if (!f) return null;
      const file = Array.isArray(f) ? f[0] : f;
      return file?.data ?? null; // Buffer
    };

    const refImageOne = pick("refImageOne"); // required
    const refImageTwo = pick("refImageTwo");
    const refImageThree = pick("refImageThree");
    const poseImageOne = pick("poseImageOne");
    const poseImageTwo = pick("poseImageTwo");
    const extraImage = pick("extraImage");

    if (!refImageOne) {
      return res.status(400).json({ error: "refImageOne is required" });
    }

    const sql = `
      INSERT INTO Commissions
        (userID, email, commissionOC, commissionText,
         refImageOne, refImageTwo, refImageThree,
         poseImageOne, poseImageTwo, extraImage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      userID ?? null,
      email,
      commissionOC,
      commissionText,
      refImageOne,
      refImageTwo,
      refImageThree,
      poseImageOne,
      poseImageTwo,
      extraImage,
    ];

    commission_db.run(sql, params, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: "Commission saved" });
    });
  } catch (e) {
    res.status(500).json({ error: e?.message || "Server error" });
  }
});

export default router;
