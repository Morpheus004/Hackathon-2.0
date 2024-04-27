import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/api/products", async (req, res) => {
    try {
      const { rows } = await db.query("SELECT * FROM product");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
router.post("/api/products", async (req, res) => {
    const { name, description,price,stock,organic } = req.body;
    try {
      const { rows } = await db.query(
        "INSERT INTO product (name, description,price,stock,is_organic) VALUES ($1, $2, $3, $4,$5) RETURNING *;",
        [name, description,price,stock,organic]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error adding event:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });


export default router;