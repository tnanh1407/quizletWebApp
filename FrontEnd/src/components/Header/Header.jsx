import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import account from "../../assets/img/account.jpg";
import logo from "../../assets/img/logoQ.png";
import { userApi } from "../../api/userApi";
import "./CssHeader.css";

// icon
import { TbCards } from "react-icons/tb";
import { TbFolder } from "react-icons/tb";
import { MdOutlineGroup } from "react-icons/md";

export default function Header({ toggleNewFolder, isNewFolder }) {
  const [addFolder, setAddFolder] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const messageRef = useRef(null);
  const buttonRef = useRef(null);
  const settingRef = useRef(null);
  const buttonSettingRef = useRef(null);

  // handle click outside add folder
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        messageRef.current &&
        !messageRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setAddFolder(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // handle click outside account menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingRef.current &&
        !settingRef.current.contains(event.target) &&
        buttonSettingRef.current &&
        !buttonSettingRef.current.contains(event.target)
      ) {
        setIsOpenAccount(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // theme
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userApi.getMe();
        setUser(data);
      } catch (err) {
        console.error("Lỗi lấy profile:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="header flex">
      <div className="logo-button flex">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
      </div>
      <div className="search flex">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for practive tests"
          className="input-research"
        />
      </div>
      <div className="account flex">
        <div className="add-folder">
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setAddFolder(true);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="setting">
          <button
            ref={buttonSettingRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenAccount(true);
            }}
          >
            <img src={user?.avatar} alt="" />
          </button>
        </div>
      </div>

      {addFolder && (
        <div id="add-folder" ref={messageRef}>
          <div className="folder-option">
            <Link to="/create/new-flashcard">
              <div className="setting-item flex">
                {/* <i className="fa-solid fa-plus"></i>*/}
                <TbCards className="icon-header" />
                <p>Flash Card</p>
              </div>
            </Link>
            <Link to="">
              <div className="setting-item flex">
                <TbFolder className="icon-header" />
                <p>Folder</p>
              </div>
            </Link>
            <Link to="/create/new-classroom">
              <div className="setting-item flex">
                <MdOutlineGroup className="icon-header" />
                <p>Class Room</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {isOpenAccount && (
        <div id="account-setting" ref={settingRef}>
          <div className="account-in4 flex">
            <img src={user?.avatar} alt="" />
            <div className="in4">
              <h1>{user?.username || "User"}</h1>
              <p>{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <div className="account-setting">
            <Link to="/achievements">
              <div className="setting-item flex">
                <i className="fa-solid fa-trophy"></i>
                <p>Achievements</p>
              </div>
            </Link>
            <Link to="/settingaccount">
              <div className="setting-item flex">
                <i className="fa-solid fa-gear"></i>
                <p>Setting</p>
              </div>
            </Link>
            <button
              onClick={toggleTheme}
              style={{
                fontSize: "16px",
                background: "none",
                border: "none",
                color: "inherit",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                padding: 0,
              }}
              className="button-mode"
            >
              <div className="setting-item flex">
                <i
                  className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"}`}
                ></i>
                <p>{isDarkMode ? "Light mode" : "Dark mode"}</p>
              </div>
            </button>
          </div>
          <div className="account-setting footer-setting">
            <Link
              to="/sign-in"
              className="account-logout"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
              }}
            >
              <div className="setting-item flex">
                <p>Log out</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
