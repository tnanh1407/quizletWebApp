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
    res
      .status(StatusCodes.OK)
      .json({ message: "User updated successfully", user: updatedUser });
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

    // check mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Old password is incorrect" });
    }

    // hash mật khẩu mới
    const hashed = await bcrypt.hash(newPassword, 10);
    await userService.updateById(req.params.id, { password: hashed });

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

export const userController = {
  getAll,
  getMe,
  getById,
  updateById,
  changePassword,
  deleteById,
};
