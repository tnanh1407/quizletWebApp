import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const FLASHCARD_COLLECTION_NAME = "flashcards";

// Schema: chỉ bắt buộc title + content
const FLASHCARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
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

  // các field backend sẽ tự tạo
  createAt: Joi.date().iso(),
  type: Joi.string().valid("flashcard"),
  tags: Joi.array().items(Joi.string()),
  language_pair: Joi.object({
    source: Joi.string(),
    target: Joi.string(),
  }),
  creator: Joi.object({
    user_id: Joi.string(),
    username: Joi.string(),
  }),
  content_count: Joi.number().integer().min(0),
  metadata: Joi.object({
    views: Joi.number().integer().min(0),
    likes: Joi.number().integer().min(0),
    status: Joi.string().valid("public", "private"),
    version: Joi.number().integer().min(1),
  }),
});

const validateBeforeCreate = (data) => {
  return FLASHCARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(FLASHCARD_COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

// chỉ nhận title + content từ client
const createNew = async (data, user) => {
  try {
    const autoData = {
      title: data.title,
      content: data.content,

      // backend tự tạo
      createAt: new Date().toISOString(),
      type: "flashcard",
      tags: [],
      language_pair: {
        source: "en",
        target: "vi",
      },
      creator: {
        user_id: user?._id?.toString() || "unknown",
        username: user?.username || "guest",
      },
      content_count: Array.isArray(data.content) ? data.content.length : 0,
      metadata: {
        views: 0,
        likes: 0,
        status: "public",
        version: 1,
      },
    };

    const validData = await validateBeforeCreate(autoData);

    const db = GET_DB();
    const result = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .insertOne(validData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    const db = GET_DB();
    const result = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const flashCardModel = {
  FLASHCARD_COLLECTION_NAME,
  FLASHCARD_COLLECTION_SCHEMA,
  getAll,
  createNew,
  getById,
};
