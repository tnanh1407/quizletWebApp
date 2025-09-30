import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { GET_DB } from "../config/mongodb.js";

const getAll = async () => {
  return await userModel.getAll();
};

const getById = async (id) => {
  return await userModel.getById(id);
};

const getMe = async (userId) => {
  return await userModel.getById(userId);
};

const createNew = async (data) => {
  const { username, email, password } = data;

  // hash password trước khi lưu
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return await userModel.createNew({
    username,
    email,
    passwordHash,
    roles: ["user"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    stats: { flashcard_count: 0, class_count: 0 },
  });
};

const updateById = async (id, data) => {
  data.updatedAt = new Date();
  return await userModel.updateById(id, data);
};

const changePassword = async (id, newPassword) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);

  return await userModel.updateById(id, {
    passwordHash,
    updatedAt: new Date(),
  });
};

const deleteById = async (id) => {
  return await userModel.deleteById(id);
};

const getAllPublic = async () => {
  const db = GET_DB();
  const users = await userModel.getAll();

  return Promise.all(
    users.map(async (u) => {
      const flashcardsCount = await db.collection("flashcards").countDocuments({
        "creator.user_id": u._id.toString(),
        delete_flashcard: false,
      });

      const classesCount = await db.collection("classrooms").countDocuments({
        "creator.user_id": u._id.toString(),
        delete_classroom: false,
      });

      return {
        _id: u._id,
        username: u.username,
        roles: u.roles,
        status: u.status,
        createdAt: u.createdAt,
        stats: {
          flashcards: flashcardsCount,
          classes: classesCount,
        },
      };
    })
  );
};

const getByIdPublic = async (id) => {
  const user = await userModel.getById(id);
  if (!user) return null;

  return {
    _id: user._id,
    username: user.username,
    roles: user.roles,
    status: user.status,
    createdAt: user.createdAt,
  };
};
export const userService = {
  getAll,
  getById,
  getMe,
  createNew,
  updateById,
  changePassword,
  deleteById,
  getAllPublic,
  getByIdPublic,
};
