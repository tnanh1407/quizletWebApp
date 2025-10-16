const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const data = [
  "Demo",
  "Demo class",
  "Demo set",
  "English vocabulary",
  "TOEIC 100+",
  "TOEFL grammar",
  "Math level 1",
  "Physics formulas"
];

// API tìm kiếm đơn giản
app.get("/api/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const results = data.filter(item => item.toLowerCase().includes(q));
  res.json({ results });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
