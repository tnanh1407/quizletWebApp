import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const CLASSROOM_COLLECTION_NAME = "classrooms";

// Schema: chỉ bắt buộc title + content
const CLASSROOM_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
  university: Joi.string().min(3).max(100).required().trim(),
  description: Joi.string().allow("").default(""),
  folders: Joi.array().items(Joi.string()).default([]),
  flashcards: Joi.array().items(Joi.string()).default([]),

  createAt: Joi.date().iso(),
  creator: Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().required(),
  }).required(),
  flashcard_count: Joi.number().integer().min(0),
  folder_count: Joi.number().integer().min(0),
  metadata: Joi.object({
    views: Joi.number().integer().min(0).default(0),
    likes: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid("public", "private").default("public"),
    version: Joi.number().integer().min(1).default(1),
  }),
  delete_classrooms: Joi.boolean().default(false),
});

// Validate trước khi lưu
const validateBeforeCreate = (data) => {
  return CLASSROOM_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

// Lấy tất cả flashcards
const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(CLASSROOM_COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

// Tạo flashcard mới
// user: object {_id, username} lấy từ token backend
const createNew = async (data, user) => {
  try {
    if (!data.creator || !data.creator.user_id || !data.creator.username) {
      throw new Error("Creator info missing");
    }

    const autoData = {
      title: data.title,
      university: data.university,
      description: data.description,
      flashcards: data.flashcards || [],
      folders: data.folders || [],
      creator: {
        user_id: data.creator.user_id.toString(),
        username: data.creator.username,
      },
      createAt: new Date().toISOString(),
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
      delete_classrooms: false,
    };

    // Validate dữ liệu
    const validData = await validateBeforeCreate(autoData);

    const db = GET_DB();
    const result = await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .insertOne(validData);

    // Lấy flashcard vừa tạo
    const newFlashCard = await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .findOne({ _id: result.insertedId });

    return newFlashCard;
  } catch (error) {
    console.error("Model createNew error:", error);
    throw new Error(error.message);
  }
};

// Lấy flashcard theo id
const getById = async (id) => {
  try {
    const db = GET_DB();
    return await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};

// Cập nhật flashcard theo id
const updateById = async (id, data) => {
  try {
    const db = GET_DB();

    const existing = await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    if (!existing) {
      throw new Error("Document not found");
    }

    const updateOps = { $set: {} };

    // Update content + content_count nếu có
    if (data.content && Array.isArray(data.content)) {
      updateOps.$set.content = data.content;
      updateOps.$set.content_count = data.content.length;
    }

    // Các field khác
    const { content, ...rest } = data;
    if (Object.keys(rest).length > 0) {
      Object.assign(updateOps.$set, rest);
    }

    if (Object.keys(updateOps.$set).length === 0) {
      throw new Error("No valid fields to update");
    }

    await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, updateOps);

    return await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Model updateById error:", error);
    throw new Error(error.message);
  }
};

const deleteById = async (id) => {
  try {
    const db = GET_DB();
    const result = await db
      .collection(CLASSROOM_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { delete_flashcard: true } }
      );

    return result.modifiedCount > 0;
  } catch (error) {
    throw new Error(error.message);
  }
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
  const classroom = await getById(classroomId);
  if (!classroom || !classroom.flashcards.includes(flashcardId)) return null;

  const updatedFlashcards = [
    ...new Set([...(classroom.flashcards || []), ...flashcardId]),
  ];

  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(classroomId) },
    {
      $pull: {
        flashcards: flashcardId,
        flashcard_count: updatedFlashcards.length,
      },
    }
  );

  return await getById(classroomId);
};

const addFolders = async (classroomId, folderId) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) return null;

  const updatedFolders = [
    ...new Set([...(classroom.folder || []), ...folderId]),
  ];

  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(folderId) },
    {
      $set: {
        folder: updatedFolders,
        folder_count: updatedFolders.length,
      },
    }
  );

  return await getById(folderId);
};

const removeFolder = async (classroomId, folderId) => {
  const db = GET_DB();
  const folder = await getById(folderId);
  if (!folder || !folder.folder.includes(folderId)) return null;

  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(folderId) },
    {
      $set: {
        folder: updatedFolders,
        folder_count: updatedFolders.length,
      },
    }
  );

  return await getById(folderId);
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
