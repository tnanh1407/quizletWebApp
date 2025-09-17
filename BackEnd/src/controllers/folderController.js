import { StatusCodes } from "http-status-codes";
import { folderService } from "../services/folderService.js";

const getAll = async (req, res, next) => {
  try {
    const folders = await folderService.getAll();
    res.status(StatusCodes.OK).json(folders);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    // nếu có auth thì truyền user: req.user
    const newFolder = await folderService.createNew(req.body, req.user);
    res.status(StatusCodes.CREATED).json(newFolder);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const folder = await folderService.getById(id);
    if (!folder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    }
    res.status(StatusCodes.OK).json(folder);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFolder = await folderService.updateById(
      id,
      req.body,
      req.user
    );
    if (!updatedFolder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    }
    res.status(StatusCodes.OK).json(updatedFolder);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await folderService.deleteById(id, req.user);
    if (!deleted) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    }
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export const folderController = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
