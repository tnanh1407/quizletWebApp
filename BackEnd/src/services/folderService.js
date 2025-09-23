import { folderModel } from "../models/folderModel.js";

const getAll = async () => folderModel.getAll();
const getById = async (id) => folderModel.getById(id);
const createNew = async (data, user) => folderModel.createNew(data, user);
const updateById = async (id, data) => folderModel.updateById(id, data);
const deleteById = async (id) => folderModel.deleteById(id);
const addFlashcards = async (folderId, flashcardIds) =>
  folderModel.addFlashcards(folderId, flashcardIds);
const removeFlashcard = async (folderId, flashcardId) =>
  folderModel.removeFlashcard(folderId, flashcardId);

export const folderService = {
  getAll,
  getById,
  createNew,
  updateById,
  deleteById,
  addFlashcards,
  removeFlashcard,
};
