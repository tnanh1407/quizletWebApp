// src/components/Dashboard/DashBoardFlashCards.jsx
export default function DashBoardFlashCards() {
  // Demo thống kê
  const stats = [
    { title: "Tổng số bộ thẻ", value: 120 },
    { title: "Bộ thẻ mới trong tuần", value: 15 },
    { title: "Bộ thẻ được học nhiều nhất", value: "IELTS Vocabulary" },
  ];

  // Demo danh sách flashcard
  const flashcards = [
    { id: 1, title: "TOEIC Vocabulary", owner: "Nguyễn Văn A", created: "2025-09-20", terms: 50 },
    { id: 2, title: "IELTS Writing Ideas", owner: "Trần Thị B", created: "2025-09-18", terms: 35 },
    { id: 3, title: "Lập trình ReactJS", owner: "Lê Văn C", created: "2025-09-10", terms: 80 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Quản lý FlashCards</h1>

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
            <p style={{ fontSize: "22px", fontWeight: "bold", marginTop: "10px" }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Danh sách flashcards */}
      <div style={{ marginTop: "40px" }}>
        <h2>📋 Danh sách FlashCards</h2>
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
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Tên bộ thẻ</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Người tạo</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Ngày tạo</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Số từ</th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map((f) => (
              <tr key={f.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{f.title}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{f.owner}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{f.created}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{f.terms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
