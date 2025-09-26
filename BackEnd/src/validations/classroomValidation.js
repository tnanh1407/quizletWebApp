const Joi = require("joi");

const classroomSchema = Joi.object({
  // Tên classroom
  name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Classroom name is required",
    "string.empty": "Classroom name cannot be empty",
    "string.min": "Classroom name must be at least 3 characters",
    "string.max": "Classroom name must be at most 100 characters",
  }),

  // Mô tả classroom
  description: Joi.string().max(255).allow(""),

  // Danh sách folders (chỉ lưu id)
  folders: Joi.array().items(Joi.string()).default([]),

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

  // Danh sách thành viên
  members: Joi.array()
    .items(
      Joi.object({
        user_id: Joi.string().required(),
        username: Joi.string().required(),
        role: Joi.string().valid("owner", "member", "guest").default("member"),
      })
    )
    .default([]),

  // Metadata
  metadata: Joi.object({
    views: Joi.number().integer().min(0).default(0),
    likes: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid("public", "private").default("public"),
    version: Joi.number().integer().min(1).default(1),
  }).default(),
});

export const classroomValidation = {
  classroomSchema,
};
