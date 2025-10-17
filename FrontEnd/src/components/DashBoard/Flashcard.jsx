import { useEffect, useState } from "react";

export default function DashBoardFlashCards() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch("https://quizlet-gzpa.onrender.com/api/v1/admin/flashcards")
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => console.error("Error fetching flashcards:", err));
  }, []);

  const totalFlashcards = flashcards.length;
  const totalTerms = flashcards.reduce(
    (sum, f) => sum + (f.content_count || 0),
    0
  );

  // Style chỉ giữ bố cục
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
      <h1>Flashcard Management</h1>

      {/* Statistics */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Thẻ 1: Total Flashcard Sets */}
        <div
          className="stat-card" // CLASS cho nền và bóng đổ
          style={cardBaseStyle}
        >
          <h3>Total Flashcard Sets</h3>
          <p
            className="stat-value" // CLASS cho màu chữ số liệu
            style={{ fontSize: "24px", fontWeight: "bold" }}
          >
            {totalFlashcards}
          </p>
        </div>

        {/* Thẻ 2: Total Terms */}
        <div
          className="stat-card" // CLASS cho nền và bóng đổ
          style={cardBaseStyle}
        >
          <h3>Total Terms</h3>
          <p
            className="stat-value" // CLASS cho màu chữ số liệu
            style={{ fontSize: "24px", fontWeight: "bold" }}
          >
            {totalTerms}
          </p>
        </div>
      </div>

      {/* Flashcard List */}
      <div style={{ marginTop: "40px" }}>
        <h2>Flashcard List</h2>
        <table
          className="data-table" // CLASS cho nền bảng
          style={tableBaseStyle}
        >
          <thead>
            <tr className="table-header-row">
              {" "}
              {/* CLASS cho tiêu đề bảng */}
              <th style={thTdStyle}>Set Name</th>
              <th style={thTdStyle}>Creator</th>
              <th style={thTdStyle}>Number of Terms</th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map((f) => (
              <tr key={f._id?.$oid || f._id}>
                <td style={thTdStyle}>{f.title}</td>
                <td style={thTdStyle}>
                  {f.creator?.username || f.ownerName || "Anonymous"}
                </td>
                <td style={thTdStyle}>{f.content_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
