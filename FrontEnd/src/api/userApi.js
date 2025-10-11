import axios from "axios";
import { authApi } from "./authApi.js";

const BASE_URL = "http://localhost:9999/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper fetch with auto refresh token
const fetchWithRefresh = async (apiCall) => {
  try {
    return await apiCall();
  } catch (err) {
    if (err.response?.status === 401) {
      // thử refresh token
      try {
        await authApi.refreshToken();
        return await apiCall(); // retry request
      } catch (refreshErr) {
        // nếu refresh token fail -> logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/sign-in";
        throw refreshErr;
      }
    } else {
      throw err;
    }
  }
};

export const userApi = {
  getMe: async () =>
    fetchWithRefresh(() =>
      axios
        .get(`${BASE_URL}/users/me`, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),

  getAllPublic: async () =>
    axios.get(`${BASE_URL}/users/public`).then((res) => res.data),

  getByIdPublic: async (id) =>
    axios.get(`${BASE_URL}/users/public/${id}`).then((res) => res.data),

  getAll: async () =>
    fetchWithRefresh(() =>
      axios
        .get(`${BASE_URL}/users`, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),

  getById: async (id) =>
    fetchWithRefresh(() =>
      axios
        .get(`${BASE_URL}/users/${id}`, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),

  updateById: async (id, data) =>
    fetchWithRefresh(() =>
      axios
        .put(`${BASE_URL}/users/${id}`, data, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),

  changePassword: async (id, data) =>
    fetchWithRefresh(() =>
      axios
        .patch(`${BASE_URL}/users/${id}/password`, data, {
          headers: getAuthHeaders(),
        })
        .then((res) => res.data)
    ),

  deleteById: async (id) =>
    fetchWithRefresh(() =>
      axios
        .delete(`${BASE_URL}/users/${id}`, { headers: getAuthHeaders() })
        .then((res) => res.data)
    ),
  updateAvatar: async (avatarUrl) =>
    fetchWithRefresh(() =>
      axios
        .put(
          `${BASE_URL}/users/avatar`,
          { avatar: avatarUrl },
          { headers: getAuthHeaders() }
        )
        .then((res) => res.data)
    ),
};
