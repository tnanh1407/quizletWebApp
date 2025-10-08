import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { userService } from "../services/userService.js";

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllPublic = async (req, res, next) => {
  try {
    const users = await userService.getAllPublic();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getByIdPublic = async (req, res, next) => {
  try {
    const user = await userService.getByIdPublic(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userService.getById(req.user.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateById(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Old password is incorrect" });
    }

    await userService.changePassword(req.params.id, newPassword);
    res
      .status(StatusCodes.OK)
      .json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    await userService.deleteById(req.params.id);
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Avatar URL is required" });
    }

    const updatedUser = await userService.updateAvatar(req.user.id, avatar);
    res.status(StatusCodes.OK).json({
      message: "Avatar updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAll,
  getAllPublic,
  getByIdPublic,
  getMe,
  getById,
  updateById,
  changePassword,
  deleteById,
  updateAvatar, // ✅ controller update avatar
};
