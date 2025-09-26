// src/apis/classroomApi.js
import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

export const classroomApi = {
  // Lấy tất cả classroom
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/class`);
    return res.data;
  },

  // Lấy chi tiết 1 classroom theo id
  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/class/${id}`);
    return res.data;
  },

  // Tạo mới classroom
  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/class`, data);
    return res.data;
  },

  // Cập nhật classroom theo id
  update: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/class/${id}`, data);
    return res.data;
  },

  // Xóa classroom theo id
  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/class/${id}`);
    return res.data;
  },
};
