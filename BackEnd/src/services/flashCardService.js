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

export const flashCardService = {
  getAll,
  createNew,
  getById,
};
