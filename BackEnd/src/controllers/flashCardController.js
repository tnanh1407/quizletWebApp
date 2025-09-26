import { StatusCodes } from "http-status-codes";
import { flashCardService } from "../services/flashCardService.js";

const getAll = async (req, res, next) => {
  try {
    const flashCards = await flashCardService.getAll();
    res.status(StatusCodes.OK).json(flashCards);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const newFlashCard = await flashCardService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(newFlashCard);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flashCard = await flashCardService.getById(id);
    if (!flashCard) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }
    res.status(StatusCodes.OK).json(flashCard);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Controller: Updating ID:", id);
    console.log("Controller: Payload:", req.body);

    const updatedFlashcard = await flashCardService.updateById(id, req.body);

    if (!updatedFlashcard) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Flashcard not found" });
    }
    res.status(StatusCodes.OK).json(updatedFlashcard);
  } catch (error) {
    console.error("Controller updateById error:", error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await flashCardService.deleteById(id);
    if (!deleted) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Flashcard not found" });
    }
    res.status(StatusCodes.OK).json({ message: "Flashcard marked as deleted" });
  } catch (error) {
    next(error);
  }
};

export const flashCardController = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
