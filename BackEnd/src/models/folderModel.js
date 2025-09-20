import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const FOLDER_COLLECTION_NAME = "folders";

// Schema: yêu cầu name, còn lại backend tự tạo
const FOLDER_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),

  // tham chiếu classroom (nếu có)
  classrooms: Joi.array().items(Joi.string()).default([]),

  // chứa flashcards (chỉ lưu id)
  flashcards: Joi.array().items(Joi.string()),

  // backend tự tạo
  createAt: Joi.date().iso(),
  creator: Joi.object({
    user_id: Joi.string(),
    username: Joi.string(),
  }),
  metadata: Joi.object({
    views: Joi.number().integer().min(0),
    likes: Joi.number().integer().min(0),
    status: Joi.string().valid("public", "private"),
    version: Joi.number().integer().min(1),
  }),
});

const validateBeforeCreate = (data) => {
  return FOLDER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(FOLDER_COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data, user) => {
  try {
    const autoData = {
      title: data.title,
      classrooms: [],
      flashcards: [],
      createAt: new Date().toISOString(),
      creator: {
        user_id: user?._id?.toString() || "unknown",
        username: user?.username || "guest",
      },
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
      .collection(FOLDER_COLLECTION_NAME)
      .insertOne(validData);

    // Lấy document vừa tạo bằng insertedId
    const newFolder = await db
      .collection(FOLDER_COLLECTION_NAME)
      .findOne({ _id: result.insertedId });

    return newFolder; // 👈 trả về document đầy đủ (có _id, title...)
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    const db = GET_DB();
    const result = await db
      .collection(FOLDER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const folderModel = {
  FOLDER_COLLECTION_NAME,
  FOLDER_COLLECTION_SCHEMA,
  getAll,
  createNew,
  getById,
};
