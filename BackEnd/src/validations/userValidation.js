import Joi from "joi";

const userSchema = Joi.object({
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
  flashcards: Joi.array().items(flashcardSchema).min(1).required().messages({
    "array.base": "Flashcards must be an array",
    "array.min": "Flashcards must have at least 1 item",
    "any.required": "Flashcards are required",
  }),
});

export const flashCardValidation = {
  userSchema,
};
