import { StatusCodes } from "http-status-codes";
import { authService } from "../services/authService.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation.js";

const register = async (req, res, next) => {
  try {
    const validated = await registerValidation.validateAsync(req.body, {
      abortEarly: false,
    });
    const { user, tokens } = await authService.register(validated);
    res.status(StatusCodes.CREATED).json({
      message: "Register success",
      user,
      tokens, // { accessToken, refreshToken }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const validated = await loginValidation.validateAsync(req.body, {
      abortEarly: false,
    });
    const { user, tokens } = await authService.login(validated);
    console.log(user);
    res.status(StatusCodes.OK).json({
      message: "Login success",
      user,
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    // req.user được set trong verifyToken (decode từ accessToken)
    const userProfile = await authService.getProfile(req.user.id);
    res.status(StatusCodes.OK).json(userProfile);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    // Với JWT stateless: chỉ cần client xoá token.
    // Nếu lưu refreshToken trong DB -> xoá tại đây.
    await authService.logout(req.user?.id);
    res.status(StatusCodes.OK).json({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Refresh token required" });
    }

    const tokens = await authService.refresh(refreshToken);
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
  me,
  logout,
  refresh,
};
