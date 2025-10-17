import axios from "axios";

// const BASE_URL = "http://localhost:9999/api/v1";
const BASE_URL = "https://quizlet-gzpa.onrender.com/api/v1";

export const folderApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/folders`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/folders/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/folders`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/folders/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/folders/${id}`);
    return res.data;
  },

  addFlashcards: async (folderId, flashcardIds) => {
    const res = await axios.patch(
      `${BASE_URL}/folders/${folderId}/flashcards`,
      { flashcardIds }
    );
    return res.data;
  },

  removeFlashcard: async (folderId, flashcardId) => {
    const res = await axios.delete(
      `${BASE_URL}/folders/${folderId}/flashcards/${flashcardId}`
    );
    return res.data;
  },
};
