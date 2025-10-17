import axios from "axios";

// const BASE_URL = "http://localhost:9999/api/v1";
const BASE_URL = "https://quizlet-gzpa.onrender.com/api/v1";
const FIXED_ID = "68e8ad357674e980fe20a234";

export const upgradeApi = {
  // Lấy tất cả upgrade
  getFixed: async () => {
    const res = await axios.get(`${BASE_URL}/upgrade`);
    return res.data; // chỉ trả về dữ liệu
  },

  // Lấy flashcard theo id
  getById: async (id = FIXED_ID) => {
    const res = await axios.get(`${BASE_URL}/upgrade/${id}`);
    return res.data;
  },

  // Tạo flashcard mới
  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/upgrade`, data);
    return res.data;
  },

  // Cập nhật flashcard theo id
  update: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/upgrade/${id}`, data);
    return res.data; // <-- bắt buộc có
  },

  // Xoá flashcard theo id (nếu cần)
  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/upgrade/${id}`);
    return res.data;
  },
};
