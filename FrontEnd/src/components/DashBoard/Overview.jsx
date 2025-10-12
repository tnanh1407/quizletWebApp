// src/components/Dashboard/Overview.jsx
export default function Overview() {
  // dữ liệu demo
  const stats = [
    { title: "Người dùng", value: 120 },
    { title: "Bộ thẻ", value: 45 },
    { title: "Thẻ", value: 320 },
  ];

  const recentActivities = [
    { id: 1, user: "Nguyễn Văn A", action: "tạo bộ thẻ", target: "English Basics", time: "2 phút trước" },
    { id: 2, user: "Trần Thị B", action: "học bộ thẻ", target: "JavaScript", time: "10 phút trước" },
    { id: 3, user: "Lê Văn C", action: "xem lại bộ thẻ", target: "Math Formulas", time: "30 phút trước" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Tổng quan hệ thống</h1>

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
            <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Hoạt động gần đây */}
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
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Người dùng</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Hoạt động</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Bộ thẻ</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{activity.user}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{activity.action}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{activity.target}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
