import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const CLASSROOM_COLLECTION_NAME = "classrooms";

const CLASSROOM_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
  university: Joi.string().min(3).max(100).required().trim(),
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
  createAt: Joi.date().iso().required(),
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
  flashcard_count: Joi.number().integer().min(0).default(0),
  folder_count: Joi.number().integer().min(0).default(0),
  member_count: Joi.number().integer().min(0).default(1),
  delete_classroom: Joi.boolean().default(false),
});

const validateClassroom = (data) =>
  CLASSROOM_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });

const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(CLASSROOM_COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  const db = GET_DB();
  return await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
};

const createNew = async (data) => {
  const autoData = {
    ...data,
    createAt: new Date().toISOString(),
    flashcards: data.flashcards || [],
    folders: data.folders || [],
    flashcard_count: Array.isArray(data.flashcards)
      ? data.flashcards.length
      : 0,
    folder_count: Array.isArray(data.folders) ? data.folders.length : 0,
    metadata: {
      views: 0,
      likes: 0,
      status: "public",
      version: 1,
    },
    member_count: 1,
    delete_classroom: false,
    members: [
      {
        user_id: data.creator.user_id,
        username: data.creator.username,
        role: "Owner",
      },
    ],
  };

  const validData = await validateClassroom(autoData);

  const db = GET_DB();
  const result = await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .insertOne(validData);

  return await getById(result.insertedId);
};

const updateById = async (id, data) => {
  const db = GET_DB();
  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });

  return await getById(id);
};

const deleteById = async (id) => {
  const db = GET_DB();
  const result = await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: { delete_classroom: true } });
  return result.modifiedCount > 0;
};

const addFlashcards = async (classroomId, flashcardIds) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) return null;

  const updatedFlashcards = [
    ...new Set([...(classroom.flashcards || []), ...flashcardIds]),
  ];

  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(classroomId) },
    {
      $set: {
        flashcards: updatedFlashcards,
        flashcard_count: updatedFlashcards.length,
      },
    }
  );

  return await getById(classroomId);
};

const removeFlashcard = async (classroomId, flashcardId) => {
  const db = GET_DB();
  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $pull: { flashcards: flashcardId } }
    );
  const classroom = await getById(classroomId);
  if (!classroom) return null;

  // Cập nhật lại flashcard_count
  const updatedFlashcards = classroom.flashcards || [];
  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $set: { flashcard_count: updatedFlashcards.length } }
    );
  return await getById(classroomId);
};

const addFolders = async (classroomId, folderIds) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) return null;

  const updatedFolders = [
    ...new Set([...(classroom.folders || []), ...folderIds]),
  ];

  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(classroomId) },
    {
      $set: {
        folders: updatedFolders,
        folder_count: updatedFolders.length,
      },
    }
  );

  return await getById(classroomId);
};

const removeFolder = async (classroomId, folderId) => {
  const db = GET_DB();
  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $pull: { folders: folderId } }
    );
  return await getById(classroomId);
};

export const classroomModel = {
  CLASSROOM_COLLECTION_NAME,
  CLASSROOM_COLLECTION_SCHEMA,
  getAll,
  createNew,
  getById,
  updateById,
  deleteById,
  addFlashcards,
  removeFlashcard,
  addFolders,
  removeFolder,
};
