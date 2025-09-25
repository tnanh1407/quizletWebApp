import "./main.scss";
import "./CssSectionClass.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parse } from "date-fns";
import { vi } from "date-fns/locale";
import { BsBookmarks } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
const SectionClass = ({ isPadded }) => {
  const [activeContentItem, setActiveContentItem] = useState("all");
  const [searchQuery] = useState("");
  const [dataClass, setDataClass] = useState([]);

  // Hàm xử lý sự kiện ở Tabs
  const handleActiveContent = (item) => {
    setActiveContentItem(item);
  };

  // Hàm format thời gian ví dụ 11h trước
  const formatTimeAgo = (dateString) => {
    // Định nghĩa định dạng chuỗi đầu vào
    const formatString = "HH:mm:ss yyyy-MM-dd";

    // Phân tích chuỗi thời gian dựa trên định dạng
    const parsedDate = parse(dateString, formatString, new Date());

    // Kiểm tra nếu ngày tháng không hợp lệ thì trả về chuỗi rỗng
    if (isNaN(parsedDate.getTime())) {
      return "Thời gian không hợp lệ";
    }

    // Trả về khoảng cách thời gian đã định dạng
    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: vi });
  };

  useEffect(() => {
    const fetchAPI = fetch("http://localhost:3000/classroom")
      .then((res) => res.json())
      .then((data) => setDataClass(data));
  }, []);

  // Hàm này sẽ lọc các sự kiện khi ấn vào Tabs
  const filteredClasses = dataClass.filter((cls) => {
    const matchesTab =
      activeContentItem === "all" ||
      (activeContentItem === "created" && cls.type === "created") ||
      (activeContentItem === "joined" && cls.type === "joined");

    const matchesSearch = cls.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "20px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="main-content-library classroom">
              <h1>Quản lí lớp học của bạn</h1>
              <h3>Tạo mới một lớp học</h3>
              <div className="create-class">
                <div className="create-class__left">
                  <img
                    className="create-class__image"
                    src="/src/assets/tudesign/closed-book.svg"
                  ></img>
                  <h3>Tạo hoặc Tham Gia Lớp Học</h3>
                  <p>
                    Nhập mã lớp để tham gia hoặc tạo một lớp học mới của riêng
                    bạn.
                  </p>
                </div>
                <div className="create-class__right">
                  <Link to="createClassroom">
                    <button className="button--gray">
                      Bắt đầu một lớp học mới của bạn
                    </button>
                  </Link>
                </div>
              </div>
              <h3>Quản lí các lớp học của bạn</h3>
              <div className="manage-class">
                <div className="manage-class__filters">
                  <div className="manage-class__tabs">
                    <button
                      className={`manage-class__tabs_item ${
                        activeContentItem === "all" ? "active" : ""
                      }`}
                      onClick={() => handleActiveContent("all")}
                    >
                      Tất cả
                    </button>
                    <button
                      className={`manage-class__tabs_item ${
                        activeContentItem === "created" ? "active" : ""
                      }`}
                      onClick={() => handleActiveContent("created")}
                    >
                      Đã tạo
                    </button>
                    <button
                      className={`manage-class__tabs_item ${
                        activeContentItem === "joined" ? "active" : ""
                      }`}
                      onClick={() => handleActiveContent("joined")}
                    >
                      Đã tham gia
                    </button>
                  </div>
                  <div className="manage-class__search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                      type="text"
                      placeholder="Tìm kiếm trong các lớp học của bạn"
                      // value={}
                      // onChange={}
                    ></input>
                  </div>
                </div>

                <div className="manage-class__list">
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((value, index) => (
                      <div class="manage-class__item" key={index}>
                        <div className="manage-class__avatar">
                          {value.avatarClass ? (
                            <img
                              className="manage-class__avatar_main_not_null"
                              src="../../../../../src/assets/img/favicon-96x96.png"
                              alt={value.name}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="manage-class__details">
                          <div className="manage-class__item_header">
                            <div className="manage-class__item_header_name">
                              <i className="fa-solid fa-users-rectangle"></i>
                              <h4>{value.name}</h4>
                            </div>
                            <ul className="manage-class__item_header_other">
                              <li>
                                <FaBook className="margin-10px" />
                                {value.numberLessons} Học phần
                              </li>
                              <li>|</li>
                              <li>
                                <IoPersonSharp className="margin-10px" />
                                {value.numberMember} Thành viên
                              </li>
                              <li>|</li>
                              <li>
                                {" "}
                                <BsBookmarks className="margin-10px " />
                                {value.numberTests} Bài kiểm tra
                              </li>
                              <li>|</li>
                              <li>
                                <FaSchool className="margin-10px" />
                                {value.school}
                              </li>
                            </ul>
                          </div>
                          <div class="manage-class__content">
                            <span>
                              <b>Người tạo :</b>
                              {value.creator || (
                                <i style={{ color: "red" }}>Không có dữ liệu</i>
                              )}
                            </span>
                            <div class="manage-class__content-time">
                              <span>
                                {value.type === "created" ? (
                                  <>
                                    <b>Thời gian tạo : </b> {value.createdTime}
                                  </>
                                ) : (
                                  <>
                                    <b>Thời gian tham gia : </b>{" "}
                                    {value.joinedTime}
                                  </>
                                )}
                              </span>
                              <span>|</span>
                              <span>
                                <b>Thời gian truy cập gần nhất</b> :
                                {formatTimeAgo(value.lastLogin)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>KHÔNG CÓ PHẦN TỬ NÀO</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionClass;
