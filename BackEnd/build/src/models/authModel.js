import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
const USER_COLLECTION_NAME = "users";
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  passwordHash: Joi.string().required(),
  avatar: Joi.string().uri().allow(""),
  fullName: Joi.string().allow(""),
  phone: Joi.string().allow(""),
  roles: Joi.array().items(Joi.string()).default(["user"]),
  status: Joi.string().valid("active", "inactive", "banned").default("active"),
  lastLogin: Joi.date().default(null),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  profile: Joi.object({
    gender: Joi.string().allow(""),
    birthday: Joi.date().allow(null),
    address: Joi.string().allow("")
  }).default({}),
  settings: Joi.object({
    language: Joi.string().default("vi"),
    theme: Joi.string().default("light"),
    notifications: Joi.boolean().default(true)
  }).default({}),
  delete_user: Joi.boolean().default(false)
});
const validateBeforeCreate = data => {
  return USER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  });
};
const createNew = async data => {
  try {
    const validData = await validateBeforeCreate(data);
    const db = GET_DB();
    const result = await db.collection(USER_COLLECTION_NAME).insertOne(validData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const findByEmail = async email => {
  try {
    const db = GET_DB();
    return await db.collection(USER_COLLECTION_NAME).findOne({
      email
    });
  } catch (error) {
    throw new Error(error);
  }
};
const updateLastLogin = async id => {
  try {
    const db = GET_DB();
    return await db.collection(USER_COLLECTION_NAME).updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        lastLogin: new Date()
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const authModel = {
  USER_COLLECTION_NAME,
  createNew,
  findByEmail,
  updateLastLogin
};