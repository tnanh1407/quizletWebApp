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

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedClassroom = await classroomService.updateById(
      id,
      req.body,
      req.user
    );
    if (!updatedClassroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Classroom not found" });
    }
    res.status(StatusCodes.OK).json(updatedClassroom);
  } catch (error) {
    next(error);
  }
};

// ✅ Xóa classroom
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await classroomService.deleteById(id, req.user);
    if (!deleted) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Classroom not found" });
    }
    res.status(StatusCodes.NO_CONTENT).send(); // không trả body khi xoá thành công
  } catch (error) {
    next(error);
  }
};

export const classroomController = {
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
};
