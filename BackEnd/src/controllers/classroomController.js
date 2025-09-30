import { StatusCodes } from "http-status-codes";
import { classroomService } from "../services/classroomService.js";

const getAll = async (req, res, next) => {
  try {
    const classrooms = await classroomService.getAll();
    res.status(StatusCodes.OK).json(classrooms);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { title, university, description, creator } = req.body;

    if (!creator || !creator.user_id || !creator.username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Creator info missing" });
    }

    const newclassroom = await classroomService.createNew({
      title,
      university,
      description,
      creator,
      members: [
        {
          user_id: creator.user_id,
          username: creator.username,
          role: "Owner",
        },
      ],
    });

    res.status(StatusCodes.CREATED).json(newclassroom);
  } catch (error) {
    console.error("Controller createNew error:", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classroom = await classroomService.getById(id);
    if (!classroom) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }
    res.status(StatusCodes.OK).json(classroom);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedclassroom = await classroomService.updateById(id, req.body);

    if (!updatedclassroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "classroom not found" });
    }
    res.status(StatusCodes.OK).json(updatedclassroom);
  } catch (error) {
    console.error("Controller updateById error:", error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await classroomService.deleteById(id);
    if (!deleted) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "classroom not found" });
    }
    res.status(StatusCodes.OK).json({ message: "classroom marked as deleted" });
  } catch (error) {
    next(error);
  }
};

const addFlashcards = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { flashcardIds } = req.body;
    const classroom = await classroomService.addFlashcards(id, flashcardIds);
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};

const removeFlashcard = async (req, res, next) => {
  try {
    const { classroomId, flashcardId } = req.params;
    const classroom = await classroomService.removeFlashcard(
      classroomId,
      flashcardId
    );
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found or flashcard not in classroom" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};
const addFolders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { folderId } = req.body;
    const classroom = await classroomService.addFlashcards(id, folderId);
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};

const removeFolder = async (req, res, next) => {
  try {
    const { classroomId, folderId } = req.params;
    const classroom = await classroomService.removeFlashcard(
      classroomId,
      folderId
    );
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found or flashcard not in classroom" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};

export const classroomController = {
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
