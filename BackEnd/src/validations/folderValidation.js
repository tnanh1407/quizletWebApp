const Joi = require("joi");

const folderSchema = Joi.object({
  // Tên folder
  title: Joi.string().min(3).max(100).required().messages({
    "any.required": "Folder name is required",
    "string.empty": "Folder name cannot be empty",
    "string.min": "Folder name must be at least 3 characters",
    "string.max": "Folder name must be at most 100 characters",
  }),

  // Liên kết đến classroom (nếu có)
  classrooms: Joi.array().items(Joi.string()).default([]),

  // Danh sách flashcards (chỉ lưu id)
  flashcards: Joi.array().items(Joi.string()).default([]),

  // Ngày tạo
  createAt: Joi.date().iso().required().messages({
    "any.required": "createAt is required",
    "date.base": "createAt must be a valid date",
    "date.format": "createAt must be in ISO format",
  }),

  // Người tạo
  creator: Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().required(),
  }).required(),

  // Metadata
  metadata: Joi.object({
    views: Joi.number().integer().min(0).default(0),
    likes: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid("public", "private").default("public"),
    version: Joi.number().integer().min(1).default(1),
  }).default(),
});

export const folderValidation = {
  folderSchema,
};
