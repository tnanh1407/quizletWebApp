const Joi = require("joi");

try {
  const validData = await CLASSROOM_COLLECTION_SCHEMA.validateAsync(autoData, {
    abortEarly: false,
  });
} catch (err) {
  console.error("Validation error:", err.details);
  throw err;
}

const classroomSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "any.required": "classroom name is required",
    "string.empty": "classroom name cannot be empty",
    "string.min": "classroom name must be at least 3 characters",
    "string.max": "classroom name must be at most 100 characters",
  }),
  university: Joi.string().min(3).max(100).required().messages({
    "any.required": "university name is required",
    "string.empty": "university name cannot be empty",
    "string.min": "university name must be at least 3 characters",
    "string.max": "university name must be at most 100 characters",
  }),
  description: Joi.string().allow("").default(""),
  members: Joi.array()
    .items(
      Joi.object({
        user_id: Joi.string().required(),
        username: Joi.string().required(),
        role: Joi.string().valid("Owner", "Admin", "Member").default("Member"),
      })
    )
    .default([]),
  folders: Joi.array().items(Joi.string()).default([]),
  flashcards: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().iso().required().messages({
    "any.required": "createAt is required",
    "date.base": "createAt must be a valid date",
    "date.format": "createAt must be in ISO format",
  }),
  creator: Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().required(),
    avatar: Joi.string().required(),
  }).required(),
  metadata: Joi.object({
    views: Joi.number().integer().min(0).default(0),
    likes: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid("public", "private").default("public"),
    version: Joi.number().integer().min(1).default(1),
  }).default(),
  flashcard_count: Joi.number().integer().min(0),
  folder_count: Joi.number().integer().min(0),
  delete_classroom: Joi.boolean().default(false),
});

export const classroomValidation = {
  classroomSchema,
};
