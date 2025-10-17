import { upgradeModel } from "../models/upgradeModel.js";
const getAll = async () => {
  return await upgradeModel.getAll();
};
const createNew = async data => {
  return await upgradeModel.createNew(data);
};
const getById = async id => {
  return await upgradeModel.getById(id);
};
const updateById = async (id, data) => {
  console.log("Service: updateById called with", id, data);
  const updated = await upgradeModel.updateById(id, data);
  console.log("Service: update result", updated);
  return updated;
};
const deleteById = async id => {
  return await upgradeModel.deleteById(id);
};
const deleteByUserId = async userId => {
  const db = GET_DB();
  await db.collection("upgrade").updateMany({
    "creator.user_id": userId
  }, {
    $set: {
      delete_flashcard: true
    }
  });
};
export const upgradeService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
  deleteByUserId
};