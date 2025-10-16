import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// GET items với pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalItems = await Item.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    const data = await Item.find().skip(skip).limit(limit);

    res.json({
      page,
      totalPages,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
