import { progressModel } from "../models/progressModel.js";

const createNew = (data) => progressModel.createNew(data);
const updateById = (id, data) => progressModel.updateById(id, data);
const getById = (id) => progressModel.getById(id);
const getByUser = (user_id) => progressModel.getByUser(user_id);
const getByFlashcardInClassroom = (user_id, flashcard_id, classroom_id) =>
  progressModel.getByFlashcardInClassroom(user_id, flashcard_id, classroom_id);

/**
 * Hàm 1: Đánh dấu đã hoàn thành (theo ID tiến trình)
 */
const markCompleted = (id, thoiGianHoanThanh) => {
  const dataToUpdate = {
    is_completed: true,
    thoiGianHoanThanh: thoiGianHoanThanh,
  };
  return progressModel.updateById(id, dataToUpdate); // Dùng updateById mới
};

/**
 * Hàm 2: Tạo mới tiến trình nếu chưa có, sau đó đánh dấu hoàn thành
 */
const createOrMarkCompleted = async (
  user_id,
  flashcard_id,
  classroom_id,
  thoiGianHoanThanh = null
) => {
  // 1. Tìm kiếm tiến trình hiện có bằng bộ 3 khóa
  let progress = await progressModel.getByFlashcardInClassroom(
    user_id,
    flashcard_id,
    classroom_id
  );

  // 2. Nếu chưa có -> Tạo mới
  if (!progress) {
    const newProgressData = {
      user_id: user_id,
      flashcard_id: flashcard_id,
      classroom_id: classroom_id,
    };
    progress = await progressModel.createNew(newProgressData);
  }

  // 3. Đánh dấu hoàn thành
  const result = await markCompleted(
    progress._id.toString(),
    thoiGianHoanThanh
  );

  return result;
};

export const progressService = {
  createNew,
  updateById,
  getById,
  getByUser,
  markCompleted, // Đã chỉnh sửa logic
  getByFlashcardInClassroom,
  createOrMarkCompleted, // BỔ SUNG
};
