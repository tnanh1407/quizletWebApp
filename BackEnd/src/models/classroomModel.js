import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const CLASSROOM_COLLECTION_NAME = "classrooms";

// Schema
const CLASSROOM_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(3).max(100).required().trim(),
  description: Joi.string().max(255).allow(""),

  // chứa folder ids
  folders: Joi.array().items(Joi.string()),

  // backend tự tạo
  createAt: Joi.date().iso(),
  creator: Joi.object({
    user_id: Joi.string(),
    username: Joi.string(),
  }),

  // members: user tham gia classroom
  members: Joi.array().items(
    Joi.object({
      user_id: Joi.string(),
      username: Joi.string(),
      role: Joi.string().valid("owner", "member", "guest").default("member"),
    })
  ),

  metadata: Joi.object({
    views: Joi.number().integer().min(0),
    likes: Joi.number().integer().min(0),
    status: Joi.string().valid("public", "private"),
    version: Joi.number().integer().min(1),
  }),
});

const validateBeforeCreate = (data) => {
  return CLASSROOM_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(CLASSROOM_COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data, user) => {
  try {
    const autoData = {
      name: data.name,
      description: data.description || "",
      folders: [],

      // backend tự tạo
      createAt: new Date().toISOString(),
      creator: {
        user_id: user?._id?.toString() || "unknown",
        username: user?.username || "guest",
      },
      members: [
        {
          user_id: user?._id?.toString() || "unknown",
          username: user?.username || "guest",
          role: "owner",
        },
      ],
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
      .collection(CLASSROOM_COLLECTION_NAME)
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
      .collection(CLASSROOM_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const classroomModel = {
  CLASSROOM_COLLECTION_NAME,
  CLASSROOM_COLLECTION_SCHEMA,
  getAll,
  createNew,
  getById,
};
