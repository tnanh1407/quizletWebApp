import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const FLASHCARD_COLLECTION_NAME = "flashcards";

const FLASHCARD_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  facebook: Joi.string().allow(""),
  flashcards: Joi.array().items(
    Joi.object({
      title: Joi.string().required().trim(),
      createAt: Joi.number().default(new Date().getFullYear()),
      type: Joi.string().default("flashcard"),
    })
  ),
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

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
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
