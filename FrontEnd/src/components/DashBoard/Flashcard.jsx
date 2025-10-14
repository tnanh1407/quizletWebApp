import { useEffect, useState } from "react";

export default function DashBoardFlashCards() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/api/v1/admin/flashcards")
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => console.error("Lỗi lấy flashcards:", err));
  }, []);

  const totalFlashcards = flashcards.length;
  const totalTerms = flashcards.reduce(
    (sum, f) => sum + (f.content_count || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Quản lý FlashCards</h1>

      {/* 📊 Thống kê */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            flex: 1,
            background: "#f1f5f9",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Tổng số bộ thẻ</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {totalFlashcards}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            background: "#f1f5f9",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Tổng số từ</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalTerms}</p>
        </div>
      </div>

      {/* 📋 Danh sách FlashCards */}
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
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Tên bộ thẻ
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Người tạo
              </th>

              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Số từ
              </th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map((f) => (
              <tr key={f._id?.$oid || f._id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {f.title}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {f.creator?.username || f.ownerName || "Ẩn danh"}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {f.content_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
