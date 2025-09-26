import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const USER_COLLECTION_NAME = "users";

const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  passwordHash: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).default(["user"]),
  status: Joi.string().default("active"),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(new Date()),
  lastLogin: Joi.date().allow(null),
  facebook: Joi.string().allow(""),
  profile: Joi.object({
    gender: Joi.string().allow(""),
    birthday: Joi.date().allow(null),
    address: Joi.string().allow(""),
  }).default({}),
  settings: Joi.object({
    language: Joi.string().default("vi"),
    theme: Joi.string().default("light"),
    notifications: Joi.boolean().default(true),
  }).default({}),
});

const validateBeforeCreate = (data) => {
  return USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

// ================= CRUD CHUNG =================
const getAll = async () => {
  const db = GET_DB();
  return await db.collection(USER_COLLECTION_NAME).find({}).toArray();
};

const getById = async (id) => {
  const db = GET_DB();
  return await db
    .collection(USER_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
};

const createNew = async (data) => {
  const validData = await validateBeforeCreate(data);
  const db = GET_DB();
  const result = await db.collection(USER_COLLECTION_NAME).insertOne(validData);
  return result.ops ? result.ops[0] : validData;
};

const updateById = async (id, data) => {
  data.updatedAt = new Date();
  const db = GET_DB();
  await db
    .collection(USER_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return await getById(id);
};

const deleteById = async (id) => {
  const db = GET_DB();
  const result = await db
    .collection(USER_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

// ================= AUTH SERVICE HỖ TRỢ =================
const findByEmail = async (email) => {
  const db = GET_DB();
  return await db.collection(USER_COLLECTION_NAME).findOne({ email });
};

const updateLastLogin = async (id) => {
  const db = GET_DB();
  await db
    .collection(USER_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: { lastLogin: new Date() } });
};

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  getAll,
  getById,
  createNew,
  updateById,
  deleteById,
  findByEmail, // dùng cho authService
  updateLastLogin, // dùng cho authService
};
