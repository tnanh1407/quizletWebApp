import { useRef, useState } from "react";
import account from "../../assets/img/account.jpg";

export default function SectionNavbar(){
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleContent = () => {
        setIsOpen(!isOpen);
    };

    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentNavbarRef = useRef(null);
    const notificationsRef = useRef(null);

    const handleClick = () => {
        if (contentNavbarRef.current && notificationsRef.current) {
        if (!isCollapsed) {
            notificationsRef.current.style.left = "50px";
            contentNavbarRef.current.style.width = "67px";
        } else {
            notificationsRef.current.style.left = "";
            contentNavbarRef.current.style.width = "";
        }
        }
        setIsCollapsed(!isCollapsed);
    };    
    return (
        <>
            <div class="button-navbar">
                <button id="click-navbar" onClick={handleClick}>
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>  
            <nav className="navbar" id="navbar" ref={contentNavbarRef}>
                <div className="navbar-one">
                    <a href="">
                        <div className="navbar-a flex active" id="navbar-one-home">
                            <i className="fa-solid fa-house"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>Home</p>
                        </div>
                    </a>
                    <a href="">
                        <div className="navbar-a flex" id="navbar-one-library">
                            <i className="fa-solid fa-folder-open"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>Your library</p>
                        </div>
                    </a>
                    <button id="click-notifi" onClick={toggleContent}>
                        <div className={`navbar-a flex ${isOpen ? "active" : ""}`} id="navbar-one-notifi">
                            <i className="fa-solid fa-bell"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>Notifications</p>
                        </div>
                    </button>
                    <div id="notifications-main" className={isOpen ? "block" : "hidden"} ref={notificationsRef}>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                        <a href="">
                            <div className="notifi-main-children flex">
                                <img src={account} alt=""/>
                                <div className="notifi-main-content">
                                    <h1>Way to go! You're on a 2 day week.<strong>Keep up the momentum and study again</strong><span>1 hours ago</span></h1>
                                </div>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="navbar-two">
                    <p className={isCollapsed ? "hidden" : "block"}>Your folders</p>
                    <a href="" className="navbar-one-home">
                        <div className="navbar-a flex">
                            <i className="fa-solid fa-folder"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>Demo</p>
                        </div>
                    </a>
                    <a href="" className="navbar-one-notifi">
                        <div className="navbar-a flex">
                            <i className="fa-solid fa-plus"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>New folder</p>
                        </div>
                    </a>
                </div>
                <div className="navbar-three">
                    <p className={isCollapsed ? "hidden" : "block"}>Start here</p>
                    <a href="" className="navbar-one-library">
                        <div className="navbar-a flex">
                            <i className="fa-solid fa-address-card"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>Flashcards</p>
                        </div>
                    </a>
                    <a href="" className="navbar-one-home">
                        <div className="navbar-a flex">
                            <i className="fa-solid fa-book"></i>
                            <p className={isCollapsed ? "hidden" : "block"}>Expert Solutions</p>
                        </div>
                    </a>
                </div>
            </nav>    
        </>
    )
}