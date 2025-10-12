import { useEffect, useState } from "react";

export default function DashBoardOverview() {
  const [data, setData] = useState({ totals: {}, activities: [] });

  useEffect(() => {
    fetch("http://localhost:9999/api/v1/admin/overview")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Lỗi lấy dữ liệu overview:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Tổng quan hệ thống</h1>

      {/* --- THỐNG KÊ --- */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {[
          { title: "Tổng người dùng", value: data.totals.users || 0 },
          { title: "Tổng bộ thẻ", value: data.totals.flashcards || 0 },
          { title: "Tổng lớp học", value: data.totals.classrooms || 0 },
        ].map((item) => (
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

      {/* --- HOẠT ĐỘNG GẦN ĐÂY --- */}
      <div style={{ marginTop: "40px" }}>
        <h2>🕓 Hoạt động gần đây</h2>
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
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Loại</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Tên</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Người tạo</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {data.activities.map((a, i) => (
              <tr key={i}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{a.type}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{a.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{a.creator}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {a.createdAt ? new Date(a.createdAt).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
