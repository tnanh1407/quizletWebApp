import account from "../../assets/img/account.jpg";
import logo from "../../assets/img/logoQ.png";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

export default function Header() {
// const Dropdown = () => {
//   const [isOpenAccount, setIsOpenAccount] = useState(false);
//   const toggleaccountRef = useRef(null);
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (toggleaccountRef.current && !toggleaccountRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [toggleaccountRef]);


  const [isOpenAccount, setIsOpenAccount] = useState(false);

  const toggleAcconut = () => {
    setIsOpenAccount(!isOpenAccount);
  };


  const [isAddFolder, setIsAddFolder] = useState(false);

  const toggleAdd = () => {
    setIsAddFolder(!isAddFolder);
  };

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
            <button onClick={toggleAdd}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="setting">
            <button onClick={toggleAcconut}>
              <img src={account} alt="" />
            </button>
          </div>
        </div>
        <div id="add-folder" className={isAddFolder ? "block" : "hidden"}>
          <div className="folder-option">
            <Link to="/flashcards">
              <div className="setting-item flex">
                <i className="fa-solid fa-trophy"></i>
                <p>Flashcard set</p>
              </div>
            </Link>
            <button>
              <div className="setting-item flex">
                <i className="fa-solid fa-gear"></i>
                <p>Folder</p>
              </div>
            </button>
          </div>
        </div>
        <div
          id="account-setting"
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
            <Link to="/">
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
      </div>
    </>
  );
}
