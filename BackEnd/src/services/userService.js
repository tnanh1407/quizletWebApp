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

const updateById = async (id, data) => {
  return await userService.updateById(id, data);
};

const deleteById = async (id) => {
  return await userService.deleteById(id);
};

export const userService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
