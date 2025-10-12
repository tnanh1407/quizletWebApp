// src/components/Dashboard/DashBoardUsers.jsx
export default function DashBoardUsers() {
  // demo thống kê
  const stats = [
    { title: "Tổng số User", value: 350 },
    { title: "User mới trong tuần", value: 25 },
    { title: "User hoạt động hôm nay", value: 10 },
  ];

  // demo hoạt động gần đây
  const recentActivities = [
    { id: 1, user: "Nguyễn Văn A", action: "đăng ký tài khoản", time: "2 phút trước" },
    { id: 2, user: "Trần Thị B", action: "tạo bộ thẻ TOEIC Vocabulary", time: "10 phút trước" },
    { id: 3, user: "Lê Văn C", action: "đăng nhập", time: "1 giờ trước" },
    { id: 4, user: "Nguyễn Thị D", action: "tạo bộ thẻ JLPT N3 Kanji", time: "2 giờ trước" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 Quản lý Users</h1>

      {/* Thẻ thống kê */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {stats.map((item) => (
          <div
            key={item.title}
            style={{
              flex: 1,
              background: "#f1f5f9",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{item.title}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bảng hoạt động gần đây */}
      <div style={{ marginTop: "40px" }}>
        <h2>📝 Hoạt động gần đây</h2>
        <table
          style={{
            width: "100%",
            marginTop: "10px",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>User</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Hành động</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((a) => (
              <tr key={a.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{a.user}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{a.action}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
