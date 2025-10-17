import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
const FLASHCARD_COLLECTION_NAME = "flashcards";

// Schema: chỉ bắt buộc title + content
const FLASHCARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(100).required().trim(),
  desc: Joi.string().allow("").default(""),
  content: Joi.array().items(Joi.object({
    front: Joi.string().required(),
    back: Joi.string().required(),
    example: Joi.string().allow(""),
    audio: Joi.string().uri().allow("")
  })).min(1).required(),
  creator: Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().required(),
    avatar: Joi.string().required()
  }).required(),
  createAt: Joi.date().iso(),
  type: Joi.string().valid("flashcard"),
  tags: Joi.array().items(Joi.string()),
  language_pair: Joi.object({
    source: Joi.string(),
    target: Joi.string()
  }),
  content_count: Joi.number().integer().min(0),
  metadata: Joi.object({
    views: Joi.number().integer().min(0),
    likes: Joi.number().integer().min(0),
    status: Joi.string().valid("public", "private"),
    version: Joi.number().integer().min(1)
  }),
  delete_flashcard: Joi.boolean().default(false)
});

// Validate trước khi lưu
const validateBeforeCreate = data => {
  return FLASHCARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  });
};

// Lấy tất cả flashcards
const getAll = async () => {
  try {
    const db = GET_DB();
    return await db.collection(FLASHCARD_COLLECTION_NAME).find({}).toArray();
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
      desc: data.desc || "",
      content: data.content,
      creator: {
        user_id: data.creator.user_id.toString(),
        username: data.creator.username,
        avatar: data.creator.avatar
      },
      createAt: new Date().toISOString(),
      type: "flashcard",
      tags: data.tags || [],
      language_pair: data.language_pair || {
        source: "en",
        target: "vi"
      },
      content_count: Array.isArray(data.content) ? data.content.length : 0,
      metadata: {
        views: 0,
        likes: 0,
        status: "public",
        version: 1
      },
      delete_flashcard: false
    };

    // Validate dữ liệu
    const validData = await validateBeforeCreate(autoData);
    const db = GET_DB();
    const result = await db.collection(FLASHCARD_COLLECTION_NAME).insertOne(validData);

    // Lấy flashcard vừa tạo
    const newFlashCard = await db.collection(FLASHCARD_COLLECTION_NAME).findOne({
      _id: result.insertedId
    });
    return newFlashCard;
  } catch (error) {
    console.error("Model createNew error:", error);
    throw new Error(error.message);
  }
};

// Lấy flashcard theo id
const getById = async id => {
  try {
    const db = GET_DB();
    return await db.collection(FLASHCARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Cập nhật flashcard theo id
const updateById = async (id, data) => {
  try {
    const db = GET_DB();
    const existing = await db.collection(FLASHCARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });
    if (!existing) {
      throw new Error("Document not found");
    }
    const updateOps = {
      $set: {}
    };

    // Update content + content_count nếu có
    if (data.content && Array.isArray(data.content)) {
      updateOps.$set.content = data.content;
      updateOps.$set.content_count = data.content.length;
    }

    // Các field khác
    const {
      content,
      ...rest
    } = data;
    if (Object.keys(rest).length > 0) {
      Object.assign(updateOps.$set, rest);
    }
    if (Object.keys(updateOps.$set).length === 0) {
      throw new Error("No valid fields to update");
    }
    await db.collection(FLASHCARD_COLLECTION_NAME).updateOne({
      _id: new ObjectId(id)
    }, updateOps);
    return await db.collection(FLASHCARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });
  } catch (error) {
    console.error("Model updateById error:", error);
    throw new Error(error.message);
  }
};

// Xóa flashcard theo id (soft delete)
const deleteById = async id => {
  try {
    const db = GET_DB();
    const result = await db.collection(FLASHCARD_COLLECTION_NAME).updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        delete_flashcard: true
      }
    });
    return result.modifiedCount > 0;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const flashCardModel = {
  FLASHCARD_COLLECTION_NAME,
  FLASHCARD_COLLECTION_SCHEMA,
  getAll,
  createNew,
  getById,
  updateById,
  deleteById
};