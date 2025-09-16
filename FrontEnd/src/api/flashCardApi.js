import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

export const flashCardApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/flashcards`);
    return res.data;
  },

  getById: async () => {
    const res = await axios.get(
      `${BASE_URL}/flashcards/68c4e66aa31cfd2d86db7280`
    );
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/flashcards`, data);
    return res.data;
  },
};
