import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/farmer/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const { rows } = await db.query(
      "SELECT users.user_id,username,email,role,farmer_id FROM users JOIN farmers ON farmers.user_id = users.user_id WHERE users.email = $1",
      [userEmail]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/customer/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const { rows } = await db.query(
      "SELECT users.uid,username,email,role,customer_id FROM users JOIN customer ON users.user_id = customer.user_id WHERE users.email = $1",
      [userEmail]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
