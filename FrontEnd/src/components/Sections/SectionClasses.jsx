import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { classroomApi } from "../../api/classroomApi";
import { getUser } from "../../other/storage";
import "./SectionClasses.css";

export default function SectionClasses() {
  const [classes, setClasses] = useState([]);
  const [activeTab, setActiveTab] = useState("created"); // "created" | "joined"
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await classroomApi.getAll();
      setClasses(data);
    };
    fetchData();
  }, []);

  const createdClasses = classes.filter(
    (cls) =>
      cls.delete_classroom === false &&
      String(cls.creator.user_id) === String(id || user.id)
  );

  const joinedClasses = classes.filter(
    (cls) =>
      cls.delete_classroom === false &&
      cls.members?.some(
        (member) => String(member.user_id) === String(id || user.id)
      ) &&
      String(cls.creator.user_id) !== String(id || user.id)
  );

  const listToShow = activeTab === "created" ? createdClasses : joinedClasses;

  const filteredList = listToShow.filter((cls) =>
    cls.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sectionclasses-container">
      {/* Header */}
      <div className="sectionclasses-header">
        {/* Dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn">
            {activeTab === "created" ? "Lớp đã tạo" : "Lớp đã tham gia"}
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className="dropdown-menu">
            <p
              className={`dropdown-item ${
                activeTab === "created" ? "active" : ""
              }`}
              onClick={() => setActiveTab("created")}
            >
              Lớp đã tạo
            </p>
            <p
              className={`dropdown-item ${
                activeTab === "joined" ? "active" : ""
              }`}
              onClick={() => setActiveTab("joined")}
            >
              Lớp đã tham gia
            </p>
          </div>
        </div>

        {/* Search box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm lớp học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>

      {/* List view */}
      <div className="sectionclasses-list">
        {filteredList.length > 0 ? (
          filteredList.map((cls) => (
            <Link
              to={`/class/${cls._id}/material`}
              key={cls._id}
              className="class-item"
            >
              <div className="class-title">
                {cls.title} <span style={{ color: "black" }}>|</span>{" "}
                {cls.university}
              </div>
              <div className="class-info">
                <span>{cls.flashcard_count || 0} sets</span>
                <span> {cls.member_count || 0} thành viên</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="empty-text">Không có lớp học nào</p>
        )}
      </div>
    </div>
  );
}
