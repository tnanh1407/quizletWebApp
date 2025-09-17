import { classroomModel } from "../models/classroomModel.js";

const getAll = async () => {
  return await classroomModel.getAll();
};

const createNew = async (data, user) => {
  return await classroomModel.createNew(data, user);
};

const getById = async (id) => {
  return await classroomModel.getById(id);
};

export const classroomService = {
  getAll,
  createNew,
  getById,
};
