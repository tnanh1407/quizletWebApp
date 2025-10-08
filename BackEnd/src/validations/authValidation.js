import Joi from "joi";

// ===================== REGISTER =====================
export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special character",
    }),
  avatar: Joi.string().messages({
    "any.required": "Avatar is required",
    "string.empty": "Avatar cannot be empty",
  }),
});

// ===================== LOGIN =====================
export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// ===================== REFRESH TOKEN =====================
export const refreshValidation = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Refresh token is required",
    "string.empty": "Refresh token cannot be empty",
  }),
});
