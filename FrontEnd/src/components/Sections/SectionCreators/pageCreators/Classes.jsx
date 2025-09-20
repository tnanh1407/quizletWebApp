import { useEffect, useState } from "react";

export default function Classes() {
  const [classes, setClasses] = useState([]);

  // Giả lập fetch dữ liệu từ backend
  useEffect(() => {
    // Sau này thay bằng API thật, ví dụ: fetch("/api/classes?creatorId=...")
    const demoData = [
      {
        id: 1,
        subjectCount: 105,
        memberCount: 5,
        location: "HUMG • Ha Noi, Viet Nam",
        title: "Từ vựng theo chủ đề",
      },
    ];
    setClasses(demoData);
  }, []);

  return (
    <div>
      {classes.map((cls) => (
        <div className="creator-card" key={cls.id}>
          <div style={{ color: "#bfcaff", fontSize: "1rem", marginBottom: 4 }}>
            {cls.subjectCount} học phần &nbsp;|&nbsp; {cls.memberCount} thành
            viên &nbsp;|&nbsp; {cls.location}
          </div>
          <span className="creator-card-title">
            <i className="fa-solid fa-user" style={{ marginRight: 8 }}></i>
            {cls.title}
          </span>
        </div>
      ))}
    </div>
  );
}
