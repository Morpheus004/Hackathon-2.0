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

  router.post("/api/products/:farmer_id", async (req, res) => {
    const farmer_id=req.params.farmer_id;
    try {
      const { rows } = await db.query(
        "INSERT INTO orders (total_amount,status,user_id) VALUES (0, 'cart',$1) RETURNING *;",
        [farmer_id]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error adding event:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  router.post("/api/orderitems/:oid", async (req, res) => {
    const oid=req.params.oid;
    console.log(oid);
    const {pid,quantity,price}=req.body;
    try {
      const { rows } = await db.query(
        "INSERT INTO order_item (order_id,product_id,price,quantity) VALUES ($1,$2,$3,0) RETURNING *",
        [oid,pid,price]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error adding event:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  export default router;