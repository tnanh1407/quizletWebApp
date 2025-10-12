// src/components/Dashboard/DashBoardUsers.jsx
import { useEffect, useState } from "react";

export default function DashBoardUsers() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisWeek: 0,
    activeToday: 0,
  });

  useEffect(() => {
    // Gọi API lấy toàn bộ users
    fetch("http://localhost:9999/api/v1/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);

        // Tính toán thống kê từ dữ liệu user
        const total = data.length;
        const now = new Date();

        const newUsers = data.filter((u) => {
          const created = new Date(u.createdAt);
          return now - created < 7 * 24 * 60 * 60 * 1000; // trong 7 ngày
        }).length;

        const activeToday = data.filter((u) => {
          if (!u.lastLogin) return false;
          const last = new Date(u.lastLogin);
          return (
            last.toDateString() === now.toDateString()
          ); // cùng ngày hôm nay
        }).length;

        setStats({
          totalUsers: total,
          newUsersThisWeek: newUsers,
          activeToday: activeToday,
        });
      })
      .catch((err) => console.error("Lỗi fetch users:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 Quản lý Users</h1>

      {/* Thẻ thống kê */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Tổng số User</h3>
          <p style={valueStyle}>{stats.totalUsers}</p>
        </div>
        <div style={cardStyle}>
          <h3>User mới trong tuần</h3>
          <p style={valueStyle}>{stats.newUsersThisWeek}</p>
        </div>
        <div style={cardStyle}>
          <h3>User hoạt động hôm nay</h3>
          <p style={valueStyle}>{stats.activeToday}</p>
        </div>
      </div>

      {/* Bảng Users gần đây */}
      <div style={{ marginTop: "40px" }}>
        <h2>📝 Danh sách User</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={thStyle}>Tên</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Ngày tạo</th>
              <th style={thStyle}>Lần đăng nhập cuối</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={tdStyle}>{u.username}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString("vi-VN")
                    : "—"}
                </td>
                <td style={tdStyle}>
                  {u.lastLogin
                    ? new Date(u.lastLogin).toLocaleString("vi-VN")
                    : "Chưa đăng nhập"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CSS inline style tái sử dụng
const cardStyle = {
  flex: 1,
  background: "#f1f5f9",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};
const valueStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "10px",
};
const tableStyle = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse",
  background: "#fff",
};
const thStyle = { padding: "10px", border: "1px solid #ccc" };
const tdStyle = { padding: "10px", border: "1px solid #ccc" };
