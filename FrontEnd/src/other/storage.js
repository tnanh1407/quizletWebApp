/**
 * Lưu thông tin user vào localStorage khi login
 * @param {Object} user - object { id, username }
 */
export const saveUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

/**
 * Lấy thông tin user từ localStorage
 * @returns {Object|null} user object { id, username } hoặc null nếu không tồn tại
 */
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
};

/**
 * Xóa thông tin user khỏi localStorage khi logout
 */
export const removeUser = () => {
  localStorage.removeItem("user");
};
