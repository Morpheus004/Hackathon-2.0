import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.put('/api/farmers/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { name, contact, bio } = req.body;

  try {
    const { rows } = await db.query(
      'UPDATE users SET name = $1, contact = $2, bio = $3 WHERE user_id = $4 RETURNING *',
      [name, contact, bio, user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

export default router;