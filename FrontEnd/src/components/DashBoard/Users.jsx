// src/components/Dashboard/DashBoardUsers.jsx
import { useEffect, useState } from "react";

// Style chỉ giữ bố cục
const cardBaseStyle = {
  flex: 1,
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const valueStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "10px",
};

const tableBaseStyle = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse",
};

const thTdStyle = { padding: "10px", border: "1px solid #ccc" };


export default function DashBoardUsers() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisWeek: 0,
    activeToday: 0,
  });

  useEffect(() => {
    // Gọi API lấy toàn bộ users -> Fetch all users API
    fetch("http://localhost:9999/api/v1/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        // ... (logic tính toán stats không đổi)
        const total = data.length;
        const now = new Date();

        const newUsers = data.filter((u) => {
          const created = new Date(u.createdAt);
          return now - created < 7 * 24 * 60 * 60 * 1000;
        }).length;

        const activeToday = data.filter((u) => {
          if (!u.lastLogin) return false;
          const last = new Date(u.lastLogin);
          return (
            last.toDateString() === now.toDateString()
          );
        }).length;

        setStats({
          totalUsers: total,
          newUsersThisWeek: newUsers,
          activeToday: activeToday,
        });
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* Statistics Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Thẻ 1: Total Users */}
        <div className="stat-card" style={cardBaseStyle}> {/* THÊM CLASS & DÙNG BASE STYLE */}
          <h3>Total Users</h3>
          <p className="stat-value" style={valueStyle}>{stats.totalUsers}</p>
        </div>
        
        {/* Thẻ 2: New Users This Week */}
        <div className="stat-card" style={cardBaseStyle}> {/* THÊM CLASS & DÙNG BASE STYLE */}
          <h3>New Users This Week</h3>
          <p className="stat-value" style={valueStyle}>{stats.newUsersThisWeek}</p>
        </div>
        
        {/* Thẻ 3: Active Users Today */}
        <div className="stat-card" style={cardBaseStyle}> {/* THÊM CLASS & DÙNG BASE STYLE */}
          <h3>Active Users Today</h3>
          <p className="stat-value" style={valueStyle}>{stats.activeToday}</p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div style={{ marginTop: "40px" }}>
        <h2>User List</h2>
        <table className="data-table" style={tableBaseStyle}> {/* THÊM CLASS & DÙNG BASE STYLE */}
          <thead>
            <tr className="table-header-row">
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Created Date</th>
              <th style={thTdStyle}>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={thTdStyle}>{u.username}</td>
                <td style={thTdStyle}>{u.email}</td>
                <td style={thTdStyle}>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString(undefined)
                    : "—"}
                </td>
                <td style={thTdStyle}>
                  {u.lastLogin
                    ? new Date(u.lastLogin).toLocaleString(undefined)
                    : "Never logged in"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}