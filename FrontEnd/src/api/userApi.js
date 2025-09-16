import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

export const userApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
  },

  getById: async () => {
    const res = await axios.get(`${BASE_URL}/users/68c75e3d30c20257bd7e9edf`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${BASE_URL}/users`, data);
    return res.data;
  },
};
