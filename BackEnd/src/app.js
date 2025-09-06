const express = require("express");
const User = require("./models/User");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test tạo user
app.post("/api/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
