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
  console.log("Service: updateById called with", id, data);

  const updated = await flashCardModel.updateById(id, data);

  console.log("Service: update result", updated);
  return updated;
};

const deleteById = async (id) => {
  return await flashCardModel.deleteById(id);
};

const deleteByUserId = async (userId) => {
  const db = GET_DB();
  await db
    .collection("flashcards")
    .updateMany(
      { "creator.user_id": userId },
      { $set: { delete_flashcard: true } }
    );
};

export const flashCardService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
  deleteByUserId,
};
