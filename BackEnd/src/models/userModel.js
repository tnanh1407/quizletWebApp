import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const USER_COLLECTION_NAME = "users";

const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  facebook: Joi.string().allow(""),
  users: Joi.array().items(
    Joi.object({
      title: Joi.string().required().trim(),
      createAt: Joi.number().default(new Date().getFullYear()),
      type: Joi.string().default("user"),
    })
  ),
});

const validateBeforeCreate = (data) => {
  return USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(USER_COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const db = GET_DB();
    const result = await db
      .collection(USER_COLLECTION_NAME)
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
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  getAll,
  createNew,
  getById,
};
