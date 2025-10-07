import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { GET_DB } from "../config/mongodb.js";

const getAll = () => userModel.getAll();
const getById = (id) => userModel.getById(id);
const getMe = (userId) => userModel.getById(userId);

const createNew = async (data) => {
  const { username, email, password } = data;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return userModel.createNew({
    username,
    email,
    passwordHash,
    avatar,
    roles: ["user"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    stats: { flashcard_count: 0, class_count: 0 },
  });
};

const updateById = (id, data) => {
  data.updatedAt = new Date();
  return userModel.updateById(id, data);
};

const changePassword = async (id, newPassword) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);
  return userModel.updateById(id, {
    passwordHash,
    updatedAt: new Date(),
  });
};

const deleteById = (id) => userModel.deleteById(id);

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
        avatar: u.avatar,
        createdAt: u.createdAt,
        stats: { flashcards: flashcardsCount, classes: classesCount },
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
    avatar: user.avatar,
  };
};

const updateAvatar = (id, avatarUrl) => userModel.updateAvatar(id, avatarUrl);

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
  updateAvatar, // ✅ thêm service update avatar
};
