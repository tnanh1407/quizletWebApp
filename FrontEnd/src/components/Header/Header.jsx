import account from "../../assets/img/account.jpg";
import logo from "../../assets/img/logoQ.png";
import React, { useState, useRef } from "react";

export default function Header(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="header flex">
            <div className="logo-button flex">
                <a href="">
                    <img src={logo} alt="" className="logo"/>
                </a>
            </div>
            <div className="search flex">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search for practive tests" className="input-research"/>
            </div>
            <div className="account flex">
                <div className="add-folder">
                    <a href=""><i className="fa-solid fa-plus"></i></a>
                </div>
                <div className="setting">
                    <button id="toggleBtn" onClick={toggleContent}>
                        <img src={account} alt=""/>
                    </button>
                </div>
            </div>
            <div id="account-setting" className={isOpen ? "block" : "hidden"}>
                <div className="account-in4 flex">
                    <img src={account} alt=""/>
                    <div className="in4">
                        <h1>thien2805</h1>
                        <p>khongthien2805@gmail.com</p>
                    </div>
                </div>
                <div className="account-setting">
                    <a href="">
                        <div className="setting-item flex">
                            <i className="fa-solid fa-trophy"></i>
                            <p>Achievements</p>
                        </div>
                    </a>
                    <a href="">
                        <div className="setting-item flex">
                            <i className="fa-solid fa-gear"></i>
                            <p>Setting</p>
                        </div>
                    </a>
                    <a href="">
                        <div className="setting-item flex">
                            <i className="fa-solid fa-sun"></i>
                            <p>Light mode</p>
                        </div>
                    </a>
                </div>
                <div className="account-setting">
                    <a href="" className="account-logout">
                        <div className="setting-item flex">
                            <p>Log out</p>
                        </div>
                    </a>
                </div>
                <div className="account-setting">
                    <a href="">
                        <div className="setting-item flex">
                            <p>Privacy policy</p>
                        </div>
                    </a>
                    <a href="">
                        <div className="setting-item flex">
                            <p>Help and feedback</p>
                        </div>
                    </a>
                    <a href="">
                        <div className="setting-item flex">
                            <p>Upgrade</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}