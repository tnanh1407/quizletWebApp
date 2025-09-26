import { StatusCodes } from "http-status-codes";
import { folderService } from "../services/folderService.js";

const getAll = async (req, res, next) => {
  try {
    const folders = await folderService.getAll();
    res.status(StatusCodes.OK).json(folders);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const folder = await folderService.getById(req.params.id);
    if (!folder)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(folder);
  } catch (err) {
    next(err);
  }
};

const createNew = async (req, res, next) => {
  try {
    const folder = await folderService.createNew(req.body, req.user);
    res.status(StatusCodes.CREATED).json(folder);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const folder = await folderService.updateById(req.params.id, req.body);
    if (!folder)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(folder);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await folderService.deleteById(id);
    if (!deleted) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    }
    res.status(StatusCodes.OK).json({ message: "Folder marked as deleted" });
  } catch (error) {
    next(error);
  }
};

const addFlashcards = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { flashcardIds } = req.body;
    const folder = await folderService.addFlashcards(id, flashcardIds);
    if (!folder)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(folder);
  } catch (err) {
    next(err);
  }
};

const removeFlashcard = async (req, res, next) => {
  try {
    const { folderId, flashcardId } = req.params;
    const folder = await folderService.removeFlashcard(folderId, flashcardId);
    if (!folder)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found or flashcard not in folder" });
    res.status(StatusCodes.OK).json(folder);
  } catch (err) {
    next(err);
  }
};

export const folderController = {
  getAll,
  getById,
  createNew,
  updateById,
  deleteById,
  addFlashcards,
  removeFlashcard,
};
