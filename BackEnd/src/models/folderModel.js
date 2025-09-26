import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import Joi from "joi";

const FOLDER_COLLECTION_NAME = "folders";

const FOLDER_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
  flashcards: Joi.array().items(Joi.string()).default([]),

  createAt: Joi.date().iso(),
  creator: Joi.object({
    user_id: Joi.string(),
    username: Joi.string(),
  }),
  flashcard_count: Joi.number().integer().min(0),
  metadata: Joi.object({
    views: Joi.number().integer().min(0).default(0),
    likes: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid("public", "private").default("public"),
    version: Joi.number().integer().min(1).default(1),
  }),
  delete_folder: Joi.boolean().default(false),
});

const validateFolder = (data) => {
  return FOLDER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const getAll = async () => {
  const db = GET_DB();
  return await db.collection(FOLDER_COLLECTION_NAME).find({}).toArray();
};

const getById = async (id) => {
  const db = GET_DB();
  return await db
    .collection(FOLDER_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
};

const createNew = async (data, user) => {
  const autoData = {
    title: data.title,
    flashcards: data.flashcards || [],
    createAt: new Date().toISOString(),
    creator: {
      user_id: user?._id?.toString() || "unknown",
      username: user?.username || "guest",
    },
    flashcard_count: Array.isArray(data.flashcards)
      ? data.flashcards.length
      : 0,
    metadata: {
      views: 0,
      likes: 0,
      status: "public",
      version: 1,
    },
    delete_folder: false,
  };

  const validData = await validateFolder(autoData);
  const db = GET_DB();
  const result = await db
    .collection(FOLDER_COLLECTION_NAME)
    .insertOne(validData);
  return await db
    .collection(FOLDER_COLLECTION_NAME)
    .findOne({ _id: result.insertedId });
};

const updateById = async (id, data) => {
  const db = GET_DB();
  await db
    .collection(FOLDER_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return await getById(id);
};

const deleteById = async (id) => {
  try {
    const db = GET_DB();
    const result = await db
      .collection(FOLDER_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, { $set: { delete_folder: true } });

    return result.modifiedCount > 0; // true nếu update thành công
  } catch (error) {
    throw new Error(error);
  }
};

const addFlashcards = async (folderId, flashcardIds) => {
  const db = GET_DB();
  const folder = await getById(folderId);
  if (!folder) return null;

  const updatedFlashcards = [
    ...new Set([...(folder.flashcards || []), ...flashcardIds]),
  ];

  await db.collection(FOLDER_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(folderId) },
    {
      $set: {
        flashcards: updatedFlashcards,
        flashcard_count: updatedFlashcards.length,
      },
    }
  );

  return await getById(folderId);
};

const removeFlashcard = async (folderId, flashcardId) => {
  const db = GET_DB();
  const folder = await getById(folderId);
  if (!folder || !folder.flashcards.includes(flashcardId)) return null;

  await db
    .collection(FOLDER_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(folderId) },
      {
        $pull: {
          flashcards: flashcardId,
          flashcard_count: updatedFlashcards.length,
        },
      }
    );

  return await getById(folderId);
};

export const folderModel = {
  getAll,
  getById,
  createNew,
  updateById,
  deleteById,
  addFlashcards,
  removeFlashcard,
};
