require("dotenv").config(); // phải nằm trên cùng

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
