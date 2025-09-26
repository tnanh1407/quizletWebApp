import { useEffect, useState } from "react";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);

  // Giả lập fetch dữ liệu từ backend
  useEffect(() => {
    // Sau này thay bằng API thật, ví dụ: fetch("/api/subjects?creatorId=...")
    const demoData = [
      {
        id: 1,
        title: "Satzadverbien (cho toàn câu, câu nối)",
        termCount: 6,
        createdAt: "2025-09-17T10:00:00Z",
      },
      {
        id: 2,
        title: "Kausal (nguyên nhân, lý do)",
        termCount: 7,
        createdAt: "2025-09-16T09:00:00Z",
      },
      {
        id: 3,
        title: "Modal (cách thức, mức độ)",
        termCount: 12,
        createdAt: "2025-09-15T08:00:00Z",
      },
      {
        id: 4,
        title: "Temporal (thời gian)",
        termCount: 15,
        createdAt: "2025-09-14T07:00:00Z",
      },
    ];
    setSubjects(demoData);
  }, []);

  // Sắp xếp theo thời gian mới nhất
  const sortedSubjects = subjects.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <div className="creator-list-title">TUẦN NÀY</div>
      {sortedSubjects.map((subject) => (
        <div className="creator-card" key={subject.id}>
          <span className="creator-card-count">
            {subject.termCount} thuật ngữ
          </span>
          <span className="creator-card-title">{subject.title}</span>
        </div>
      ))}
    </div>
  );
}
