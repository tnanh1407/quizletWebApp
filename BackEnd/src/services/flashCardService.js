import { flashCardModel } from "../models/flashCardModel.js";

const getAll = async () => {
  return await flashCardModel.getAll();
};

const createNew = async (data) => {
  return await flashCardModel.createNew(data);
};

const getById = async (id) => {
  return await flashCardModel.getById(id);
};

const updateById = async (id, data) => {
  return await flashCardModel.updateById(id, data);
};

const deleteById = async (id) => {
  return await flashCardModel.deleteById(id);
};

export const flashCardService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
