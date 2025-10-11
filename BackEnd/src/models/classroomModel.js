import Joi from "joi";
import { GET_DB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import { userModel } from "./userModel.js";

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
        avatar: Joi.string().allow(""),
      })
    )
    .default([]),
  pending_users: Joi.array().items(
    Joi.object({
      user_id: Joi.string().required(),
      username: Joi.string().required(),
      avatar: Joi.string().allow(""),
      email: Joi.string().email().allow(""),
    })
  ),
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
        avatar: data.creator.avatar,
        role: "Owner",
      },
    ],
    pending_users: [],
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

// Thêm member vào classroom
const addMember = async (classroomId, member) => {
  if (!member || !member.user_id || !member.username) {
    throw new Error("Invalid member object");
  }

  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) return null;

  // Nếu đã tồn tại user_id thì trả về classroom hiện tại (hoặc có thể throw)
  const exists = (classroom.members || []).some(
    (m) => m.user_id === member.user_id
  );
  if (exists) return classroom;

  const newMember = {
    user_id: member.user_id,
    username: member.username,
    avatar: member.avatar,
    role: member.role || "Member",
  };

  // Thêm member và tăng member_count
  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(classroomId) },
    {
      $push: { members: newMember },
      $inc: { member_count: 1 },
    }
  );

  return await getById(classroomId);
};
// Xóa member khỏi classroom
const removeMember = async (classroomId, userId) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) return null;

  const member = (classroom.members || []).find((m) => m.user_id === userId);
  if (!member) return null;

  // Bảo vệ: không xóa Owner bằng API này (nếu muốn chuyển quyền, làm flow khác)
  if (member.role === "Owner") {
    // Bạn có thể thay bằng return null hoặc throw tùy cách xử lý trong controller
    throw new Error("Cannot remove Owner");
  }

  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $pull: { members: { user_id: userId } } }
    );

  // Đồng bộ member_count với số member thực tế (an toàn)
  const updatedClassroom = await getById(classroomId);
  const actualCount = (updatedClassroom.members || []).length;
  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $set: { member_count: actualCount } }
    );

  return await getById(classroomId);
};

// Thêm member vào classroom bằng email (nếu chưa có, throw lỗi)
const addMemberByEmail = async (classroomId, email) => {
  const db = GET_DB();

  //  Tìm user theo email
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error("User not found with this email");
  }

  //  Lấy classroom hiện tại
  const classroom = await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(classroomId) });

  if (!classroom) throw new Error("Classroom not found");

  //  Kiểm tra nếu user đã là thành viên
  const alreadyMember = classroom.members.some(
    (m) => m.user_id === user._id.toString()
  );
  if (alreadyMember) throw new Error("User already a member");

  //  Tạo object thành viên mới
  const newMember = {
    user_id: user._id.toString(),
    username: user.username,
    avatar: user.avatar,
    role: "Member",
  };

  //  Cập nhật classroom
  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(classroomId) },
    {
      $push: { members: newMember },
      $inc: { member_count: 1 },
    }
  );

  //  Trả classroom sau cập nhật
  return await getById(classroomId);
};

//  Gửi yêu cầu tham gia (pending)
const requestJoin = async (classroomId, user) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) throw new Error("Classroom not found");

  // Kiểm tra nếu đã là thành viên
  const isMember = classroom.members.some((m) => m.user_id === user.user_id);
  if (isMember) throw new Error("Already a member");

  // Kiểm tra nếu đã gửi yêu cầu trước đó
  const isPending = (classroom.pending_users || []).some(
    (p) => p.user_id === user.user_id
  );
  if (isPending) throw new Error("Already requested");

  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $push: { pending_users: user } }
    );

  return await getById(classroomId);
};

// Duyệt hoặc từ chối yêu cầu tham gia
const handleJoinRequest = async (classroomId, userId, action) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) throw new Error("Classroom not found");

  const pendingUser = (classroom.pending_users || []).find(
    (u) => u.user_id === userId
  );
  if (!pendingUser) throw new Error("User not in pending list");

  // Xóa khỏi pending list
  await db
    .collection(CLASSROOM_COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(classroomId) },
      { $pull: { pending_users: { user_id: userId } } }
    );

  if (action === "accept") {
    // Thêm vào members
    await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(classroomId) },
      {
        $push: {
          members: {
            user_id: pendingUser.user_id,
            username: pendingUser.username,
            avatar: pendingUser.avatar,
            email: pendingUser.email,
            role: "Member",
          },
        },
        $inc: { member_count: 1 },
      }
    );
  }

  return await getById(classroomId);
};

// Hủy yêu cầu tham gia
const cancelJoinRequest = async (classroomId, userId) => {
  const db = GET_DB();
  const classroom = await getById(classroomId);
  if (!classroom) throw new Error("Classroom not found");

  await db.collection(CLASSROOM_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(classroomId) },
    // Sửa đúng tên trường là "pending_users"
    { $pull: { pending_users: { user_id: userId } } }
  );

  // Trả về classroom đã cập nhật
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
  addMember,
  removeMember,
  addMemberByEmail,
  requestJoin,
  handleJoinRequest,
  cancelJoinRequest, //  Thêm hàm mới
};
