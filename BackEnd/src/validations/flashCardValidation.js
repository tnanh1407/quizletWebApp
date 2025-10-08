const Joi = require("joi");

try {
  const validData = await FLASHCARD_COLLECTION_SCHEMA.validateAsync(autoData, {
    abortEarly: false,
  });
} catch (err) {
  console.error("Validation error:", err.details);
  throw err;
}

const flashcardSchema = Joi.object({
  // Tiêu đề
  title: Joi.string().min(3).max(100).required().messages({
    "any.required": "Flashcard title is required",
    "string.empty": "Flashcard title cannot be empty",
    "string.min": "Flashcard title must be at least 3 characters",
    "string.max": "Flashcard title must be at most 100 characters",
  }),

  desc: Joi.string().min(10).max(255).required().messages({
    "any.required": "Desc title is required",
    "string.empty": "Desc title cannot be empty",
    "string.min": "Desc title must be at least 3 characters",
    "string.max": "Desc title must be at most 100 characters",
  }),

  // Ngày tạo (ví dụ dùng timestamp hoặc năm)
  createAt: Joi.date().iso().required().messages({
    "any.required": "createAt is required",
    "date.base": "createAt must be a valid date",
    "date.format": "createAt must be in ISO format",
  }),

  // Loại flashcard
  type: Joi.string().valid("flashcard").required().messages({
    "any.required": "Flashcard type is required",
    "any.only": "Flashcard type must be 'flashcard'",
  }),

  // Tags (mảng string)
  tags: Joi.array().items(Joi.string()).default([]),

  // Ngôn ngữ (cặp source-target)
  language_pair: Joi.object({
    source: Joi.string().required(),
    target: Joi.string().required(),
  }).required(),

  // Người tạo
  creator: Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().required(),
    avatar: Joi.string().required(),
  }).required(),

  // Nội dung flashcard (mảng các object front/back/example/audio)
  content: Joi.array()
    .items(
      Joi.object({
        front: Joi.string().required(),
        back: Joi.string().required(),
        example: Joi.string().allow(""),
        audio: Joi.string().uri().allow(""),
      })
    )
    .min(1)
    .required(),

  // Metadata
  metadata: Joi.object({
    views: Joi.number().integer().min(0).default(0),
    likes: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid("public", "private").default("public"),
    version: Joi.number().integer().min(1).default(1),
  }).default(),

  // Số lượng content (có thể derive tự động từ content.length)
  content_count: Joi.number().integer().min(0),

  delete_flashcard: Joi.boolean().default(false),
});

export const flashCardValidation = {
  flashcardSchema,
};
