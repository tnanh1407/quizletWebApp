import "./CssFolder.css";
import { Link } from "react-router-dom";
import { folderApi } from "../../../../api/folderApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemsSeeDemo from "../../../../other/Demo/SeeDemo/Items/ItemsSeeDemo";

export default function Folder() {
  const [folder, setFolder] = useState([]);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const data = await folderApi.getAll();
        setFolder(data);
      } catch (error) {
        console.error("Error fetching folder:", error);
      }
    };
    fetchFolder();
  }, []);
  return (
    <>
      <div className="main-content-library classroom">
        <h1>Quản lí lớp học của bạn</h1>
        <h3>Tạo mới một lớp học</h3>
        <div className="create-class">
          <div className="create-class__left">
            <img src="/src/assets/tudesign/closed-book.svg"></img>
            <h3>Tạo hoặc Tham Gia Lớp Học</h3>
            <p>
              Nhập mã lớp để tham gia hoặc tạo một lớp học mới của riêng bạn.
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
                className={"manage-class__tabs_item"}
                // onClick={() => handleActiveContent("all")}
              >
                Tất cả
              </button>
              <button
                className={"manage-class__tabs_item"}
                // onClick={() => handleActiveContent("created")}
              >
                Đã tạo
              </button>
              <button
                className={"manage-class__tabs_item "}
                // onClick={() => handleActiveContent("joined")}
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
            {folder.length > 0 ? (
              folder.map((value, index) => (
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
                          <i style={{ color: "red" }}> Không có dữ liệu</i>
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
                            <b>Thời gian tham gia : </b> {value.joinedTime}
                          </>
                        )}
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
    </>
  );
}
