import { StatusCodes } from "http-status-codes";
import { classroomService } from "../services/classroomService.js";

const getAll = async (req, res, next) => {
  try {
    const classrooms = await classroomService.getAll();
    res.status(StatusCodes.OK).json(classrooms);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { title, university, description, creator } = req.body;

    if (!creator || !creator.user_id || !creator.username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Creator info missing" });
    }

    const newclassroom = await classroomService.createNew({
      title,
      university,
      description,
      creator,
      members: [
        {
          user_id: creator.user_id,
          username: creator.username,
          role: "Owner",
          // avatar: creator.avatar,
        },
      ],
    });

    res.status(StatusCodes.CREATED).json(newclassroom);
  } catch (error) {
    console.error("Controller createNew error:", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classroom = await classroomService.getById(id);
    if (!classroom) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }
    res.status(StatusCodes.OK).json(classroom);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedclassroom = await classroomService.updateById(id, req.body);

    if (!updatedclassroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "classroom not found" });
    }
    res.status(StatusCodes.OK).json(updatedclassroom);
  } catch (error) {
    console.error("Controller updateById error:", error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await classroomService.deleteById(id);
    if (!deleted) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "classroom not found" });
    }
    res.status(StatusCodes.OK).json({ message: "classroom marked as deleted" });
  } catch (error) {
    next(error);
  }
};

const addFlashcards = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { flashcardIds } = req.body;
    const classroom = await classroomService.addFlashcards(id, flashcardIds);
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};

const removeFlashcard = async (req, res, next) => {
  try {
    const { classroomId, flashcardId } = req.params;
    const classroom = await classroomService.removeFlashcard(
      classroomId,
      flashcardId
    );
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found or flashcard not in classroom" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};
const addFolders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { folderId } = req.body;
    const classroom = await classroomService.addFlashcards(id, folderId);
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};

const removeFolder = async (req, res, next) => {
  try {
    const { classroomId, folderId } = req.params;
    const classroom = await classroomService.removeFlashcard(
      classroomId,
      folderId
    );
    if (!classroom)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Folder not found or flashcard not in classroom" });
    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    next(err);
  }
};

const addMember = async (req, res, next) => {
  try {
    const { id } = req.params; // classroom id
    const { user_id, username, role } = req.body;

    if (!user_id || !username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "member info missing" });
    }

    const classroom = await classroomService.addMember(id, {
      user_id,
      username,
      role,
    });

    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "classroom not found" });
    }

    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    // xử lý lỗi do không xóa Owner (nếu bị throw)
    next(err);
  }
};

const addMemberByEmail = async (req, res, next) => {
  try {
    const { id } = req.params; // classroomId
    const { email } = req.body;

    const updatedClassroom = await classroomService.addMemberByEmail(id, email);
    res.status(StatusCodes.OK).json(updatedClassroom);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message || "Failed to add member" });
  }
};

const removeMember = async (req, res, next) => {
  try {
    const { classroomId, userId } = req.params;

    const classroom = await classroomService.removeMember(classroomId, userId);

    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "classroom not found or member not exists" });
    }

    res.status(StatusCodes.OK).json(classroom);
  } catch (err) {
    if (err.message === "Cannot remove Owner") {
      return res.status(StatusCodes.FORBIDDEN).json({ message: err.message });
    }
    next(err);
  }
};

// Gửi yêu cầu tham gia lớp
const requestJoin = async (req, res, next) => {
  try {
    const { id } = req.params; // classroomId
    const { user_id, username, avatar } = req.body;

    if (!user_id || !username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing user info" });
    }

    const classroom = await classroomService.requestJoin(id, {
      user_id,
      username,
      avatar,
    });
    res.status(StatusCodes.OK).json(classroom);
  } catch (error) {
    next(error);
  }
};

// Duyệt hoặc từ chối yêu cầu tham gia
const handleJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params; // classroomId
    const { user_id, action } = req.body; // action = "accept" | "reject"

    const classroom = await classroomService.handleJoinRequest(
      id,
      user_id,
      action
    );
    res.status(StatusCodes.OK).json(classroom);
  } catch (error) {
    next(error);
  }
};
// Hủy yêu cầu tham gia lớp
const cancelJoinRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const db = await GET_DB();
    const classroom = await db
      .collection("classrooms")
      .findOne({ _id: new ObjectId(id) });

    if (!classroom) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Class not found" });
    }

    await db
      .collection("classrooms")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { pendingMembers: { user_id } } }
      );

    const updated = await db
      .collection("classrooms")
      .findOne({ _id: new ObjectId(id) });

    res.status(StatusCodes.OK).json(updated);
  } catch (err) {
    console.error("Cancel join error:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error canceling join request" });
  }
};

export const classroomController = {
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
  cancelJoinRequest,
};
