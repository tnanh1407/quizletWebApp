import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

// ICON
import { FaPen } from "react-icons/fa"; // icon bút (edit)
import { FaUserPlus } from "react-icons/fa"; // thêm người dùng
import { FaBell } from "react-icons/fa"; // chuông thông báo
import { FaExclamationTriangle } from "react-icons/fa"; // cảnh báo
import { FaTrash } from "react-icons/fa"; // thùng rác (delete)
import { FaTimes } from "react-icons/fa"; // dấu X (close)
import "./CssClassDetail.css";
import ModalEdit from "./Modal/ModalEdit";
import ModalInvest from "./Modal/ModalInvest";
export default function Class() {
  const [activeModal, setActiveModal] = useState();
  const [iconAdd, setIconAdd] = useState(false);
  const [iconMenu, setIconMenu] = useState(false);

  // pupup ICON
  const iconAddRef = useRef();
  const iconMenuRef = useRef();
  const popupAddRef = useRef();
  const popupMenuRef = useRef();

  const [classData, setClassData] = useState({
    className: "",
    description: "",
    allowSection: false,
    allowInvite: false,
    schoolName: "",
  });

  // Popup Menu chức năng mời
  const [investMember, setInvestMember] = useState("");

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        iconAddRef.current &&
        !iconAddRef.current.contains(e.target) &&
        popupAddRef.current &&
        !popupAddRef.current.contains(e.target)
      ) {
        setIconAdd(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        iconMenuRef.current &&
        !iconMenuRef.current.contains(e.target) &&
        popupMenuRef.current &&
        !popupMenuRef.current.contains(e.target)
      ) {
        setIconMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="ClassDetail">
        {/* Thanh thông báo */}
        <div className="element-notice">
          <h5>Mời học sinh tham gia lớp này</h5>
          <p>
            Học sinh có quyền truy cập miễn phí vào các hoạt động và tài liệu mà
            bạn thêm vào lớp học của mình
          </p>
        </div>

        <div className="header_classDetail">
          <div className="header_one">
            <div className="header_one_l">
              <h2>Toán</h2>
              <span className="l_school">HUMG - F</span>
            </div>
            <div className="header_one_r">
              <div
                className="r_icon"
                ref={iconAddRef}
                onClick={(e) => {
                  setIconAdd(!iconAdd);
                  setIconMenu(false);
                  e.stopPropagation();
                  console.log("đã click");
                }}
              >
                +
              </div>

              <div
                className="r_icon"
                ref={iconMenuRef}
                onClick={(e) => {
                  setIconMenu(!iconMenu);
                  setIconAdd(false);
                  e.stopPropagation();
                }}
              >
                ...
              </div>
            </div>
          </div>
        </div>
        {iconAdd && (
          <div id="icon-add" ref={popupAddRef} className="popup-dropdown">
            <div className="folder-option">
              <Link to="/create/new-classroom">
                <div className="setting-item flex">
                  <i className="fa-solid fa-plus"></i>
                  <p>Flash Card</p>
                </div>
              </Link>
              <Link to="/create/new-classroom">
                <div className="setting-item flex">
                  <i className="fa-solid fa-plus"></i>
                  <p>Class Room</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {iconMenu && (
          <div id="icon-menu" className="popup-dropdown" ref={popupMenuRef}>
            <div className="folder-option">
              <div
                className="setting-item flex"
                onClick={() => setActiveModal("EDIT")}
              >
                <FaPen className="margin-right-20px" />
                <p>Sửa</p>
              </div>
              <div
                className="setting-item flex"
                onClick={() => setActiveModal("INVEST")}
              >
                <FaUserPlus className="margin-right-20px" />
                <p>Mới</p>
              </div>
              <div className="setting-item flex">
                <FaBell className="margin-right-20px" />
                <p>Thông báo</p>
              </div>
              <div className="setting-item flex">
                <FaExclamationTriangle className="margin-right-20px" />
                <p>Bỏ ghim khỏi thanh lề</p>
              </div>
              <div className="setting-item flex ">
                <FaTrash className="margin-right-20px color-red" />
                onClick={() => setActiveModal("DELETE")}
                <p>Xóa</p>
              </div>
              <div
                className="setting-item flex"
                onClick={() => setActiveModal("DELETE_MEMBER_ALL")}
              >
                <FaTimes className="margin-right-20px color-red" />
                <p>Xóa mọi thành viên</p>
              </div>
            </div>
          </div>
        )}

        {activeModal === "EDIT" && (
          <>
            <ModalEdit
              onClose={() => setActiveModal(null)}
              initialData={classData}
              onSave={(data) => {
                setClassData(data);
                console.log(data);
              }}
            />
          </>
        )}

        {activeModal === "INVEST" && (
          <>
            <ModalInvest
              onClose={() => setActiveModal(null)}
              onSave={(data) => {
                console.log(data);
              }}
            />
          </>
        )}
        <div className="header_two">
          <NavLink to="/class/material">
            <button className="tab active">Tài liệu học</button>
          </NavLink>
          <NavLink to="/class/member">
            <button className="tab">Thành viên</button>
          </NavLink>
        </div>

        {/* Nút mời */}
        <div className="header_three">
          <button className="invite google">📂 Mời bằng Google</button>
          <button className="invite email">✉️ Mời bằng email</button>
          <button className="invite link">🔗 Chép liên kết</button>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
