import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

export const classroomApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/classrooms`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/classrooms/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/classrooms`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/classrooms/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/classrooms/${id}`);
    return res.data;
  },

  addFlashcards: async (classroomId, flashcardIds) => {
    const res = await axios.patch(
      `${BASE_URL}/classrooms/${classroomId}/flashcards`,
      { flashcardIds }
    );
    return res.data;
  },

  removeFlashcard: async (classroomId, flashcardId) => {
    const res = await axios.delete(
      `${BASE_URL}/classrooms/${classroomId}/flashcards/${flashcardId}`
    );
    return res.data;
  },
  addFolders: async (classroomId, folderIds) => {
    const res = await axios.patch(
      `${BASE_URL}/classrooms/${classroomId}/folders`,
      { folderIds }
    );
    return res.data;
  },

  removeFolder: async (classroomId, folderId) => {
    const res = await axios.delete(
      `${BASE_URL}/classrooms/${classroomId}/folders/${folderId}`
    );
    return res.data;
  },
};
