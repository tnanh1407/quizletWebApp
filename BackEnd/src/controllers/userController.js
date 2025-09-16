import { StatusCodes } from "http-status-codes";
import { userService } from "../services/userService.js";

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const newuser = await userService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(newuser);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAll,
  createNew,
  getById,
};
