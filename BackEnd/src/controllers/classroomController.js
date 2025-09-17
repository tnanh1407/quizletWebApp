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
    const newClassroom = await classroomService.createNew(req.body, req.user);
    res.status(StatusCodes.CREATED).json(newClassroom);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classroom = await classroomService.getById(id);
    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Classroom not found" });
    }
    res.status(StatusCodes.OK).json(classroom);
  } catch (error) {
    next(error);
  }
};

export const classroomController = {
  getAll,
  createNew,
  getById,
};
