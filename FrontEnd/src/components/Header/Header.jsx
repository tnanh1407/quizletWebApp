import account from "../../assets/img/account.jpg";
import logo from "../../assets/img/logoQ.png";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [addFolder, setAddFolder] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const messageRef = useRef(null);
  const buttonRef = useRef(null);
  const settingRef = useRef(null);
  const buttonSettingRef = useRef(null);

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
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
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
              <img src={account} alt="" />
            </button>
          </div>
        </div>
        {addFolder && (
          <div
            id="add-folder"
            // className={isAddFolder ? "block" : "hidden"}
            ref={messageRef}
          >
            <div className="folder-option">
              <Link to="/flashcards">
                <div className="setting-item flex">
                  <i className="fa-solid fa-trophy"></i>
                  <p>Flashcard set</p>
                </div>
              </Link>
              <button className="header-add-folder">
                <div className="setting-item flex">
                  <i className="fa-solid fa-gear"></i>
                  <p>Folder</p>
                </div>
              </button>
            </div>
          </div>
        )}
        {isOpenAccount && (
          <div
            id="account-setting"
            ref={settingRef}
            className={isOpenAccount ? "block" : "hidden"}
          >
            <div className="account-in4 flex">
              <img src={account} alt="" />
              <div className="in4">
                <h1>thien2805</h1>
                <p>khongthien2805@gmail.com</p>
              </div>
            </div>
            <div className="account-setting">
              <Link to="/achievenments">
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
              <Link to="/">
                <div className="setting-item flex">
                  <i className="fa-solid fa-sun"></i>
                  <p>Light mode</p>
                </div>
              </Link>
            </div>
            <div className="account-setting">
              <Link to="/" className="account-logout">
                <div className="setting-item flex">
                  <p>Log out</p>
                </div>
              </Link>
            </div>
            <div className="account-setting">
              <Link to="/">
                <div className="setting-item flex">
                  <p>Privacy policy</p>
                </div>
              </Link>
              <Link to="/">
                <div className="setting-item flex">
                  <p>Help and feedback</p>
                </div>
              </Link>
              <Link to="/">
                <div className="setting-item flex">
                  <p>Upgrade</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
