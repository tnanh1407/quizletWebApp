import Joi from "joi";

const flashcardSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "any.required": "Flashcard title is required",
    "string.empty": "Flashcard title cannot be empty",
    "string.min": "Flashcard title must be at least 3 characters",
    "string.max": "Flashcard title must be at most 100 characters",
  }),
  createAt: Joi.number().integer().min(1900).max(2100).required().messages({
    "any.required": "createAt is required",
    "number.base": "createAt must be a number",
    "number.min": "createAt must be >= 1900",
    "number.max": "createAt must be <= 2100",
  }),
  type: Joi.string().valid("flashcard").required().messages({
    "any.required": "Flashcard type is required",
    "any.only": "Flashcard type must be 'flashcard'",
  }),
});

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
  flashcardSchema,
};
