import { folderModel } from "../models/folderModel.js";

const getAll = async () => {
  return await folderModel.getAll();
};

const createNew = async (data, user) => {
  return await folderModel.createNew(data, user);
};

const getById = async (id) => {
  return await folderModel.getById(id);
};

const updateById = async (id, data) => {
  return await folderService.updateById(id, data);
};

const deleteById = async (id) => {
  return await folderService.deleteById(id);
};

export const folderService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
