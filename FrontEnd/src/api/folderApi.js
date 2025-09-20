import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

export const folderApi = {
  // Lấy tất cả flashcards
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/folders`);
    return res.data; // chỉ trả về dữ liệu
  },

  // Lấy flashcard theo id
  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/folders/${id}`);
    return res.data;
  },

  // Tạo flashcard mới
  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/folders`, data);
    return res.data;
  },

  // Cập nhật flashcard theo id
  update: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/folders/${id}`, data);
    return res.data; // <-- bắt buộc có
  },

  // Xoá flashcard theo id (nếu cần)
  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/folders/${id}`);
    return res.data;
  },
};
