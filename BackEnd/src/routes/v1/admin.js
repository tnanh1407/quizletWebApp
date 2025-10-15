// src/routes/v1/admin.js
import express from "express";
import { userModel } from "../../models/userModel.js";
import { GET_DB } from "../../config/mongodb.js";
const router = express.Router();

// 🧩 Lấy tất cả user (KHÔNG cần đăng nhập, chỉ để demo dashboard)
router.get("/users", async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách user:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🧩 Lấy 1 user cụ thể (công khai)
router.get("/users/:id", async (req, res) => {
  try {
    const user = await userModel.getByIdPublic(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Lỗi lấy user theo ID:", err);
    res.status(500).json({ error: err.message });
  }
});

// 📚 Lấy tất cả flashcards
router.get("/flashcards", async (req, res) => {
  try {
    const db = GET_DB();
    const flashcards = await db.collection("flashcards").find({}).toArray();
    res.json(flashcards);
  } catch (err) {
    console.error("❌ Lỗi lấy flashcards:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🧩 API thống kê tổng quan + hoạt động gần đây
router.get("/overview", async (req, res) => {
  try {
    const db = GET_DB();

    // Lấy tổng số
    const [usersCount, flashcardsCount, classroomsCount] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("flashcards").countDocuments(),
      db.collection("classrooms").countDocuments(),
    ]);

    // Lấy 5 hoạt động mới nhất (từ flashcards + classrooms)
    const flashcards = await db
      .collection("flashcards")
      .find({}, { projection: { title: 1, creator: 1, createAt: 1 } })
      .sort({ createAt: -1 })
      .limit(5)
      .toArray();

    const classrooms = await db
      .collection("classrooms")
      .find({}, { projection: { title: 1, creator: 1, createAt: 1 } })
      .sort({ createAt: -1 })
      .limit(5)
      .toArray();

    // Gộp dữ liệu thành "hoạt động gần đây"
    const activities = [
      ...flashcards.map((f) => ({
        type: "Tạo bộ thẻ",
        name: f.title,
        creator: f.creator?.username || "Ẩn danh",
        createdAt: f.createAt,
      })),
      ...classrooms.map((c) => ({
        type: "Tạo lớp học",
        name: c.title,
        creator: c.creator?.username || "Ẩn danh",
        createdAt: c.createAt,
      })),
    ]
      .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
      .slice(0, 10);

    res.json({
      totals: {
        users: usersCount,
        flashcards: flashcardsCount,
        classrooms: classroomsCount,
      },
      activities,
    });
  } catch (err) {
    console.error("❌ Lỗi lấy overview:", err);
    res.status(500).json({ error: err.message });
  }
});

export const adminRoutes = router; // 👈 export đúng cách
