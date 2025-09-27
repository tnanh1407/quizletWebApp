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
          <h5>Invite students to join this class</h5>
          <p>
            Students get free access to activities and materials you add to your
            class
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
                <p>Edit</p>
              </div>
              <div
                className="setting-item flex"
                onClick={() => setActiveModal("INVEST")}
              >
                <FaUserPlus className="margin-right-20px" />
                <p>Invite</p>
              </div>
              <div className="setting-item">
                <FaBell className="margin-right-20px" />
                <p>Notifications</p>
              </div>
              <div className="setting-item">
                <FaExclamationTriangle className="margin-right-20px" />
                <p>Unpin from sidebar</p>
              </div>
              <div className="setting-item ">
                onClick={() => setActiveModal("DELETE")}
                <i class="fa-solid fa-xmark red"></i>
                <p> Delete</p>
              </div>
              <div
                className="setting-item "
                onClick={() => setActiveModal("DELETE_MEMBER_ALL")}
              >
                <i class="fa-solid fa-trash red"></i>
                <p>Remove all members</p>
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
            <button className="tab active">Material</button>
          </NavLink>
          <NavLink to="/class/member">
            <button className="tab">Members</button>
          </NavLink>
        </div>

        {/* Nút mời */}
        <div className="header_three">
          <button className="invite google">📂 Invite using Google</button>
          <button className="invite email">✉️ Invite using email</button>
          <button className="invite link">🔗 Copy link</button>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
