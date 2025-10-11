import axios from "axios";

const BASE_URL = "http://localhost:9999/v1";

// Lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authApi = {
  register: async (data) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);

    return res.data;
  },

  login: async (data) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);

    // lưu accessToken và refreshToken
    if (res.data?.accessToken)
      localStorage.setItem("token", res.data.accessToken);
    if (res.data?.refreshToken)
      localStorage.setItem("refreshToken", res.data.refreshToken);
    // Lưu tokens và thông tin người dùng
    if (res.data?.tokens) {
      localStorage.setItem("token", res.data.tokens.accessToken);
      localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
    }
    if (res.data?.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  getProfile: async () => {
    const res = await axios.get(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
    if (res.data?.accessToken)
      localStorage.setItem("token", res.data.accessToken);
    return res.data;
  },
};
