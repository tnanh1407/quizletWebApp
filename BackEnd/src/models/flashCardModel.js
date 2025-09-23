import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

const FLASHCARD_COLLECTION_NAME = "flashcards";

// Schema: chỉ bắt buộc title + content
const FLASHCARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
  desc: Joi.string().allow("").default(""),
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
  delete_flashcard: Joi.boolean().default(false),
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
      desc: data.desc,
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
      delete_flashcard: false,
    };

    const validData = await validateBeforeCreate(autoData);

    const db = GET_DB();
    const result = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .insertOne(validData);

    const newFlashCard = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .findOne({ _id: result.insertedId });

    return newFlashCard;
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

const updateById = async (id, data) => {
  try {
    console.log("=== updateById called ===");
    console.log("Updating ID:", id);

    const db = GET_DB();

    // Kiểm tra document có tồn tại
    const existing = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    if (!existing) {
      console.log("Model: Document not found for ID", id);
      return null;
    }

    const updateOps = { $set: {} };

    // Update content + content_count nếu client gửi
    if (data.content && Array.isArray(data.content)) {
      updateOps.$set.content = data.content;
      updateOps.$set.content_count = data.content.length;
    }

    // Update các field còn lại
    const { content, ...rest } = data;
    if (Object.keys(rest).length > 0) {
      Object.assign(updateOps.$set, rest);
    }

    if (Object.keys(updateOps.$set).length === 0) {
      throw new Error("No valid fields to update");
    }

    console.log("Update payload (after build):", updateOps);

    // Thay findOneAndUpdate bằng updateOne + findOne
    const updateResult = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, updateOps);

    console.log("UpdateOne result:", updateResult);

    // Lấy document mới sau khi update
    const updatedDoc = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    console.log("Model: Update result:", updatedDoc);

    return updatedDoc;
  } catch (error) {
    console.error("Model updateById error:", error);
    throw error;
  }
};

// Xóa flashcard theo id
const deleteById = async (id) => {
  try {
    const db = GET_DB();
    const result = await db
      .collection(FLASHCARD_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { delete_flashcard: true } }
      );

    return result.modifiedCount > 0; // true nếu update thành công
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
  updateById,
  deleteById,
};
