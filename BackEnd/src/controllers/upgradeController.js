import { StatusCodes } from "http-status-codes";
import { upgradeService } from "../services/upgradeService.js";

const getAll = async (req, res, next) => {
  try {
    const flashCards = await upgradeService.getAll();
    res.status(StatusCodes.OK).json(flashCards);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { title, desc, content, creator } = req.body;

    if (!creator || !creator.user_id || !creator.username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Creator info missing" });
    }

    const newFlashCard = await upgradeService.createNew({
      title,
      desc,
      content,
      creator,
    });

    res.status(StatusCodes.CREATED).json(newFlashCard);
  } catch (error) {
    console.error("Controller createNew error:", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flashCard = await upgradeService.getById(id);
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

    const updatedFlashcard = await upgradeService.updateById(id, req.body);

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
    const deleted = await upgradeService.deleteById(id);
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

export const upgradeController = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
