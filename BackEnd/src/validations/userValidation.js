import Joi from "joi";

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
  flashcard_count: Joi.number().integer().min(0),
  class_count: Joi.number().integer().min(0),
  delete_user: Joi.boolean().default(false),
});

// ===================== EXPORT =====================
export const userValidation = {
  userSchema,
};
