import "./main.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parse } from "date-fns";
import { vi } from "date-fns/locale";

const SectionClass = ({ isPadded }) => {
  const [activeContentItem, setActiveContentItem] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleActiveContent = (item) => {
    setActiveContentItem(item);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //   const formatTimeAgo = (dateString) => {
  //     const [time, date] = dateString.split(" ");
  //     const isoString = `${date}T${time}`;
  //     const parsedDate = parseISO(isoString);

  //     return formatDistanceToNow(parsedDate, { addSuffix: true, locale: vi });
  //   };
  //   /**
  //  * Hàm này tính toán và định dạng thời gian đã trôi qua.
  //  * @param {string} dateString Chuỗi thời gian (ví dụ: "14:07:30 2024-10-27")
  //  * @returns {string} Chuỗi thời gian đã định dạng.
  //  */
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

  // Dữ liệu giả định cho các lớp học
  const allClasses = [
    {
      avatarClass: "",
      joinedTime: null,
      createdTime: "2024-10-27",
      id: 1,
      name: "Toán cao cấp A1",
      type: "created",
      numberMember: 10,
      teacher: "Trần Tuấn Minh",
      lastLogin: "14:07:30 2024-10-27",
    },
    {
      avatarClass: "",
      joinedTime: "2024-10-25",
      createdTime: null,
      id: 2,
      name: "Lập trình Web nâng cao",
      type: "joined",
      numberMember: 30,
      teacher: "Nguyễn Văn A",
      lastLogin: "09:20:15 2024-10-27",
    },
    {
      avatarClass: "https://example.com/avatars/physics.png",
      joinedTime: null,
      createdTime: "2024-10-26",
      id: 3,
      name: "Vật lí đại cương",
      type: "created",
      numberMember: 25,
      teacher: "Lê Thị B",
      lastLogin: "11:55:00 2024-10-26",
    },
    {
      avatarClass: "https://example.com/avatars/data-structure.png",
      joinedTime: "2024-10-24",
      createdTime: null,
      id: 4,
      name: "Cấu trúc dữ liệu và giải thuật",
      type: "joined",
      numberMember: 45,
      teacher: "Trần C",
      lastLogin: "08:10:45 2024-10-27",
    },
    {
      avatarClass: "https://example.com/avatars/system-analysis.png",
      joinedTime: null,
      createdTime: "2024-10-23",
      id: 5,
      name: "Phân tích hệ thống thông tin",
      type: "created",
      numberMember: 20,
      teacher: "Phạm D",
      lastLogin: "16:40:05 2024-10-26",
    },
    {
      avatarClass: "https://example.com/avatars/computer-arch.png",
      joinedTime: "2024-10-22",
      createdTime: null,
      id: 6,
      name: "Kiến trúc máy tính",
      type: "joined",
      numberMember: 15,
      teacher: "Hoàng E",
      lastLogin: "10:30:20 2024-10-27",
    },
    {
      avatarClass: "https://example.com/avatars/os.png",
      joinedTime: null,
      createdTime: "2024-10-21",
      id: 7,
      name: "Hệ điều hành",
      type: "created",
      numberMember: 20,
      teacher: "Đỗ F",
      lastLogin: "13:15:50 2024-10-27",
    },
    {
      avatarClass: "https://example.com/avatars/java.png",
      joinedTime: "2024-10-20",
      createdTime: null,
      id: 8,
      name: "Lập trình Java",
      type: "joined",
      numberMember: 8,
      teacher: "Nguyễn G",
      lastLogin: "07:05:00 2024-10-26",
    },
    {
      avatarClass: "https://example.com/avatars/network.png",
      joinedTime: null,
      createdTime: "2024-10-19",
      id: 9,
      name: "Mạng máy tính",
      type: "created",
      numberMember: 12,
      teacher: "",
      lastLogin: "15:25:10 2024-10-27",
    },
    {
      avatarClass: "/src/assets/img/account.jpg",
      joinedTime: "17:50:35 2024-9-12",
      createdTime: null,
      id: 10,
      name: "Cơ sở dữ liệu",
      type: "joined",
      numberMember: 25,
      teacher: null,
      lastLogin: "17:50:35 2025-9-12",
    },
  ];
  const filteredClasses = allClasses.filter((cls) => {
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
                  <img src="/src/assets/tudesign/closed-book.svg"></img>
                  <h3>Tạo hoặc Tham Gia Lớp Học</h3>
                  <p>
                    Nhập mã lớp để tham gia hoặc tạo một lớp học mới của riêng
                    bạn.
                  </p>
                </div>
                <div className="create-class__right">
                  <div className="create-class__join_class">
                    <input type="text" placeholder="Nhập mã lớp học" />
                    <button className="button--join">Tìm kiếm</button>
                  </div>
                  <Link to="createClassroom">
                    <button className="button--create">Tạo lớp mới</button>
                  </Link>
                </div>
              </div>

              {/* Quản lí các lớp học mà bạn đã tạo */}
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
                              src={value.avatarClass}
                              alt={value.name}
                            />
                          ) : (
                            <>
                              <img
                                className="manage-class__avatar_main"
                                src="/src/assets/img/account.jpg"
                                alt="Avatar mặc định"
                              />
                              <img
                                className="manage-class__avatar_sub"
                                src="/src/assets/img/favicon-96x96.png"
                                alt="Avatar phụ"
                              />
                            </>
                          )}
                        </div>
                        <div className="manage-class__details">
                          <div class="manage-class__item_header">
                            <i className="fa-solid fa-users-rectangle"></i>
                            <h4>{value.name}</h4>
                          </div>
                          <div class="manage-class__content">
                            <span>
                              <b>Giảng viên :</b>
                              {value.teacher || (
                                <i style={{ color: "red" }}>
                                  {" "}
                                  Không có dữ liệu
                                </i>
                              )}
                            </span>
                            <span>
                              <b>Thành viên :</b> {value.numberMember}
                            </span>
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
                            <span>
                              <b>Thời gian truy cập gần nhất</b> :
                              {formatTimeAgo(value.lastLogin)}
                            </span>
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
