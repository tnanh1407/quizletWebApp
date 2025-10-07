import { classroomModel } from "../models/classroomModel.js";

const getAll = async () => {
  return await classroomModel.getAll();
};

const createNew = async (data) => classroomModel.createNew(data);

const getById = async (id) => classroomModel.getById(id);

const updateById = async (id, data) => classroomModel.updateById(id, data);

const deleteById = async (id) => classroomModel.deleteById(id);

const addFlashcards = async (classroomId, flashcardIds) =>
  classroomModel.addFlashcards(classroomId, flashcardIds);

const removeFlashcard = async (classroomId, flashcardId) =>
  classroomModel.removeFlashcard(classroomId, flashcardId);

const addFolders = async (classroomId, folderIds) =>
  classroomModel.addFolders(classroomId, folderIds);

const removeFolder = async (classroomId, folderId) =>
  classroomModel.removeFolder(classroomId, folderId);

export const classroomService = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
  addFlashcards,
  removeFlashcard,
  addFolders,
  removeFolder,
};
