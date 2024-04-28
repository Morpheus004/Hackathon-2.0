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

  router.get("/api/products/p/:productId", async (req, res) => {
    try {
      const productId=req.params.productId;
      const { rows } = await db.query("SELECT * FROM product where product_id=$1",[productId]);
      console.log(rows[0]);
      res.json(rows[0]);
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


  router.get("/api/selected-products/:user_id", async (req, res) => {
    try {
      const user_id = req.params.user_id; 
      console.log("Printing for added in cart",user_id);  

      const { rows } = await db.query(
        "SELECT product_id FROM order_item oi " +
        "JOIN orders o ON oi.order_id = o.order_id " +
        "WHERE o.status = 'cart' AND o.user_id = $1",
        [user_id]
      );
      console.log(rows);;
      // Extracting product IDs from the rows
      const selectedProductIds = rows.map(row => row.product_id);
      console.log(selectedProductIds);
      res.json(selectedProductIds);
    } catch (error) {
      console.error("Error fetching selected products:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  router.put("/api/update-quantity/:product_id", async (req, res) => {
    const { product_id } = req.params;
    const { quantity } = req.body;
  
    try {
      const result = await db.query(
        "UPDATE order_item SET quantity = $1 WHERE product_id = $2",
        [quantity, product_id]
      );
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
  router.put("/api/checkout", async (req, res) => {
    const { order_id, total_amount } = req.body;
    try {
      const result = await db.query(
        "UPDATE orders SET total_amount = $1, status = 'checkout' WHERE order_id = $2",
        [total_amount, order_id]
      );
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating total amount and status:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
  export default router;