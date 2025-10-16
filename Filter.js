import express from "express";
import StudySet from "../models/StudySet.js";

const router = express.Router();

// GET /api/filters?school=MIT&contentType=Images
router.get("/", async (req, res) => {
  try {
    const { school, terms, createdBy, contentType } = req.query;
    const query = {};

    if (school && school !== "All") query.school = school;
    if (createdBy && createdBy !== "All users") query.createdBy = createdBy;
    if (contentType && contentType !== "All") query.contentType = contentType;

    if (terms && terms !== "All") {
      if (terms === "1–10") query.terms = { $lte: 10 };
      else if (terms === "10–20") query.terms = { $gte: 10, $lte: 20 };
      else if (terms === "20+") query.terms = { $gte: 20 };
    }

    const results = await StudySet.find(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
