import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";

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

export const userService = {
  getAll,
  getById,
  getMe,
  createNew,
  updateById,
  changePassword,
  deleteById,
};
