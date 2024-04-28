import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/api/products/:farmer_id", async (req, res) => {
    const farmer_id=req.params.farmer_id;
    try {
      const { rows } = await db.query("SELECT * FROM product where farmer_id=$1",[farmer_id]);
      res.json(rows);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
router.post("/api/products/:farmer_id", async (req, res) => {
    const farmer_id=req.params.farmer_id;
    const { name, description,price,stock,organic,discount} = req.body;
    try {
      const { rows } = await db.query(
        "INSERT INTO product (name, description,price,stock,is_organic,farmer_id,discount) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *;",
        [name, description,price,stock,organic,farmer_id,discount]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error adding event:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  router.put("/api/products/:product_id", async (req, res) => {
    const productId = req.params.product_id;
    const { name, description, price, stock, organic,discount } = req.body;
    try {
      const { rows } = await db.query(
        "UPDATE product SET name = $1, description = $2, price = $3, stock = $4, is_organic = $5,discount=$6 WHERE product_id = $7 RETURNING *;",
        [name, description, price, stock, organic,discount, productId]
      );
      if (rows.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
  // Delete a product
  router.delete("/api/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
      const { rowCount } = await db.query("DELETE FROM product WHERE product_id = $1;", [
        productId,
      ]);
      if (rowCount === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.sendStatus(204); // No content
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

export default router;