// src/api/progressApi.js
import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

/**
 * Helper: thử gọi api với base /progress, nếu 404 thì thử /progresses
 * fn nhận `base` (string) và phải return axios(...) promise
 */
const tryProgressUrls = async (fn) => {
  try {
    return await fn(`${BASE_URL}/progress`);
  } catch (err) {
    // nếu server trả 404 cho /progress -> thử /progresses
    if (err.response && err.response.status === 404) {
      return await fn(`${BASE_URL}/progresses`);
    }
    throw err;
  }
};

export const progressApi = {
  createNew: async (data) =>
    tryProgressUrls((base) => axios.post(`${base}`, data).then((r) => r.data)),

  updateById: async (id, data) =>
    tryProgressUrls((base) =>
      axios.put(`${base}/${id}`, data).then((r) => r.data)
    ),

  getById: async (id) =>
    tryProgressUrls((base) => axios.get(`${base}/${id}`).then((r) => r.data)),

  getByUser: async (user_id) =>
    tryProgressUrls((base) =>
      axios.get(`${base}/user/${user_id}`).then((r) => r.data)
    ),

  markCompleted: async (id, body = {}) =>
    tryProgressUrls((base) =>
      axios.patch(`${base}/${id}/complete`, body).then((r) => r.data)
    ),

  getByFlashcardInClassroom: async (user_id, flashcard_id, classroom_id) =>
    tryProgressUrls((base) =>
      axios
        .get(`${base}/flashcard/${user_id}/${flashcard_id}/${classroom_id}`)
        .then((r) => r.data)
    ),

  // **BỔ SUNG:** Hàm API cho Tạo mới nếu chưa có, sau đó hoàn thành
  createOrMarkCompleted: async (
    user_id,
    flashcard_id,
    classroom_id,
    body = {} // Cần truyền thoiGianHoanThanh
  ) =>
    tryProgressUrls((base) =>
      axios
        .post(
          `${base}/flashcard/${user_id}/${flashcard_id}/${classroom_id}/complete`,
          body
        )
        .then((r) => r.data)
    ),
};
