import Joi from "joi";

// ===================== FLASHCARD SCHEMA =====================
export const userSchema = Joi.object({
  _id: Joi.string().optional(),
  question: Joi.string().required().messages({
    "any.required": "Question is required",
    "string.empty": "Question cannot be empty",
  }),
  answer: Joi.string().required().messages({
    "any.required": "Answer is required",
    "string.empty": "Answer cannot be empty",
  }),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

// ===================== USER SCHEMA =====================
export const userSchema = Joi.object({
  _id: Joi.string().optional(),
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
  facebook: Joi.string().allow("").messages({
    "string.base": "Facebook must be a string",
  }),
  flashcards: Joi.array().items(userSchema).optional().messages({
    "array.base": "Flashcards must be an array",
  }),
  roles: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid("active", "inactive").optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

// ===================== EXPORT =====================
export const userValidation = {
  userSchema,
};
