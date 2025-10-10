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
  const [pendingClasses, setPendingClasses] = useState([]);

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

  const exploreClasses = classes.filter(
    (cls) =>
      cls.delete_classroom === false &&
      !cls.members?.some((m) => String(m.user_id) === String(user.id))
  );

  const joinedClasses = classes.filter(
    (cls) =>
      cls.delete_classroom === false &&
      cls.members?.some(
        (member) => String(member.user_id) === String(id || user.id)
      ) &&
      String(cls.creator.user_id) !== String(id || user.id)
  );

  const listToShow =
    activeTab === "created"
      ? createdClasses
      : activeTab === "joined"
      ? joinedClasses
      : exploreClasses;

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

            <p
              className={`dropdown-item ${
                activeTab === "explore" ? "active" : ""
              }`}
              onClick={() => setActiveTab("explore")}
            >
              Tất cả lớp học
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
      {/* List view */}
      <div className="sectionclasses-list">
        {filteredList.length > 0 ? (
          filteredList.map((cls) => (
            <div key={cls._id} className="class-item">
              <div
                className="class-main"
                onClick={() =>
                  (window.location.href = `/class/${cls._id}/material`)
                }
                style={{ cursor: "pointer" }}
              >
                <div className="class-title">
                  {cls.title} <span style={{ color: "black" }}>|</span>{" "}
                  {cls.university}
                </div>
                <div className="class-info">
                  <span>{cls.flashcard_count || 0} sets</span>
                  <span> {cls.member_count || 0} thành viên</span>
                </div>
              </div>

              {/* Nếu user chưa tham gia, hiển thị nút "Tham gia" */}
              {!cls.members?.some(
                (m) => String(m.user_id) === String(user.id)
              ) && (
                <>
                  {/* Nếu người dùng đang trong danh sách chờ */}
                  {cls.pending_users?.some(
                    (p) => String(p.user_id) === String(user.id)
                  ) ? (
                    <button className="join-btn disabled" disabled>
                      Đợi xác nhận
                    </button>
                  ) : (
                    <button
                      className="join-btn"
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          await classroomApi.requestJoin(cls._id, {
                            user_id: user.id,
                            username: user.fullName || user.username,
                            avatar: user.avatar || "",
                          });

                          // ✅ Cập nhật lại UI ngay (thêm user vào pending_users)
                          setClasses((prev) =>
                            prev.map((item) =>
                              item._id === cls._id
                                ? {
                                    ...item,
                                    pending_users: [
                                      ...(item.pending_users || []),
                                      { user_id: user.id },
                                    ],
                                  }
                                : item
                            )
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      Tham gia
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="empty-text">Không có lớp học nào</p>
        )}
      </div>
    </div>
  );
}
