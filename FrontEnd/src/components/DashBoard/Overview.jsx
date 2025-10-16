import { useEffect, useState } from "react";

export default function DashBoardOverview() {
  const [data, setData] = useState({ totals: {}, activities: [] });

  useEffect(() => {
    fetch("http://localhost:9999/api/v1/admin/overview")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching overview data:", err));
  }, []);

  // Inline style chỉ giữ các thuộc tính bố cục, loại bỏ màu sắc/bóng đổ
  const cardBaseStyle = {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  };

  const tableBaseStyle = {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  };

  const thTdStyle = { padding: "10px", border: "1px solid #ccc" };

  return (
    <div style={{ padding: "20px" }}>
      <h1>System Overview</h1>

      {/* --- THỐNG KÊ --- */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {[
          { title: "Total Users", value: data.totals.users || 0 },
          { title: "Total Flashcard Sets", value: data.totals.flashcards || 0 },
          { title: "Total Classrooms", value: data.totals.classrooms || 0 },
        ].map((item) => (
          <div
            key={item.title}
            className="stat-card" // CLASS cho nền và bóng đổ
            style={cardBaseStyle}
          >
            <h3>{item.title}</h3>
            <p 
              className="stat-value" // CLASS cho màu chữ số liệu
              style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* --- RECENT ACTIVITY --- */}
      <div style={{ marginTop: "40px" }}>
        <h2>Recent Activity</h2>
        <table
          className="data-table" // CLASS cho nền bảng
          style={tableBaseStyle}
        >
          <thead>
            <tr className="table-header-row"> {/* CLASS cho tiêu đề bảng */}
              <th style={thTdStyle}>Type</th>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Creator</th>
              <th style={thTdStyle}>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.activities.map((a, i) => (
              <tr key={i}>
                <td style={thTdStyle}>{a.type}</td>
                <td style={thTdStyle}>{a.name}</td>
                <td style={thTdStyle}>{a.creator}</td>
                <td style={thTdStyle}>  
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