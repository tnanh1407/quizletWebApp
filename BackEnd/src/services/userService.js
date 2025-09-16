import { userModel } from "../models/userModel.js";

const getAll = async () => {
  return await userModel.getAll();
};

const createNew = async (data) => {
  return await userModel.createNew(data);
};

const getById = async (id) => {
  return await userModel.getById(id);
};

export const userService = {
  getAll,
  createNew,
  getById,
};
