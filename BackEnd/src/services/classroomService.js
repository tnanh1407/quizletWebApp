import { classroomModel } from "../models/classroomModel.js";

const getAll = async () => {
  return await classroomModel.getAll();
};

const createNew = async (data) => {
  return await classroomModel.createNew(data);
};

const getById = async (id) => {
  return await classroomModel.getById(id);
};

const updateById = async (id, data) => {
  console.log("Service: updateById called with", id, data);

  const updated = await classroomModel.updateById(id, data);

  console.log("Service: update result", updated);
  return updated;
};

const deleteById = async (id) => {
  return await classroomModel.deleteById(id);
};

const deleteByUserId = async (userId) => {
  const db = GET_DB();
  await db
    .collection("classrooms")
    .updateMany(
      { "creator.user_id": userId },
      { $set: { delete_classroom: true } }
    );
};

export const classroomService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
  deleteByUserId,
};
