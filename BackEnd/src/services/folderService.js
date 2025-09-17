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

export const folderService = {
  getAll,
  createNew,
  getById,
};
