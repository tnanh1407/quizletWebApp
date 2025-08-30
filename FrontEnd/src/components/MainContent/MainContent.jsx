import account from "../../assets/img/account.jpg"
import sach from "../../assets/img/imgSach.jpg"
import React, { useState, useRef } from "react";

export default function MainContent (){
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
        <div className="main flex">
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
            <div className="maincontent">
                <div className="main-content">
                    <div className="maincontent-recent margin-bottom-50">
                        <h1>Recents</h1>
                        <div className="recent-main">
                            <a href="">
                                <div className="recent flex">
                                    <div className="recent-icon">
                                        <i className="fa-solid fa-address-card"></i>      
                                    </div>
                                    <div className="recent-content">
                                        <p>Phát triển iot</p>
                                        <p>Flashcard set  •  50 terms  •  by quizlette42792101  •  by quizlette42792101</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="recent flex">
                                    <div className="recent-icon">
                                        <i className="fa-solid fa-address-card"></i>      
                                    </div>
                                    <div className="recent-content">
                                        <p>Phát triển iot</p>
                                        <p>Flashcard set  •  50 terms  •  by quizlette42792101  •  by quizlette42792101</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="recent flex">
                                    <div className="recent-icon">
                                        <i className="fa-solid fa-address-card"></i>      
                                    </div>
                                    <div className="recent-content">
                                        <p>Phát triển iot</p>
                                        <p>Flashcard set  •  50 terms  •  by quizlette42792101  •  by quizlette42792101</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="recent flex">
                                    <div className="recent-icon">
                                        <i className="fa-solid fa-address-card"></i>      
                                    </div>
                                    <div className="recent-content">
                                        <p>Phát triển iot</p>
                                        <p>Flashcard set  •  50 terms  •  by quizlette42792101  •  by quizlette42792101</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="recent flex">
                                    <div className="recent-icon">
                                        <i className="fa-solid fa-address-card"></i>      
                                    </div>
                                    <div className="recent-content">
                                        <p>Phát triển iot</p>
                                        <p>Flashcard set  •  50 terms  •  by quizlette42792101  •  by quizlette42792101</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="recent flex">
                                    <div className="recent-icon">
                                        <i className="fa-solid fa-address-card"></i>      
                                    </div>
                                    <div className="recent-content">
                                        <p>Phát triển iot</p>
                                        <p>Flashcard set  •  50 terms  •  by quizlette42792101  •  by quizlette42792101</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="maincontent-next-study-session margin-bottom-50 padding-16">
                        <h2 className="h2">For your next study session</h2>
                        <div className="next-study-session-main flex">
                            <button className="btn maincontent-recent-left ">
                                <i className="fa-solid fa-circle-chevron-left"></i>
                            </button>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <button className="btn maincontent-recent-right ">
                                <i className="fa-solid fa-circle-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="maincontent-next-study-session margin-bottom-50 padding-16">
                        <h2 className="h2">Popular flashcard sets</h2>
                        <div className="next-study-session-main flex">
                            <button className="btn maincontent-recent-left ">
                                <i className="fa-solid fa-circle-chevron-left"></i>
                            </button>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="session all-section">
                                    <h1>Câu trả lời Đúng/Sai và giải thích</h1>
                                    <div className="session-terms">
                                        <p>10 terms</p>
                                    </div>
                                    <div className="session-author flex">
                                        <img src={account} alt=""/>
                                        <p>Thien</p>
                                    </div>
                                </div>
                            </a>
                            <button className="btn maincontent-recent-right ">
                                <i className="fa-solid fa-circle-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="popular-textbooks margin-bottom-50 padding-16">
                        <h2 className="h2">Popular textbooks</h2>
                        <div className="popular-textbooks-main flex">
                            <a href="">
                                <div className="popular-session flex all-section">
                                    <img src={sach} alt=""/>
                                    <div className="popular-session-content">
                                        <h1>English Grammar in Use</h1>
                                        <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                        <div className="popular-session-solution flex">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <p>999 solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="popular-session flex all-section">
                                    <img src={sach} alt=""/>
                                    <div className="popular-session-content">
                                        <h1>English Grammar in Use</h1>
                                        <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                        <div className="popular-session-solution flex">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <p>999 solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="popular-session flex all-section">
                                    <img src={sach} alt=""/>
                                    <div className="popular-session-content">
                                        <h1>English Grammar in Use</h1>
                                        <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                        <div className="popular-session-solution flex">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <p>999 solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="popular-textbooks margin-bottom-50 padding-16">
                        <h2 className="h2">Popular textbooks</h2>
                        <div className="popular-textbooks-main flex">
                            <a href="">
                                <div className="popular-session flex all-section">
                                    <img src={sach} alt=""/>
                                    <div className="popular-session-content">
                                        <h1>English Grammar in Use</h1>
                                        <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                        <div className="popular-session-solution flex">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <p>999 solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="popular-session flex all-section">
                                    <img src={sach} alt=""/>
                                    <div className="popular-session-content">
                                        <h1>English Grammar in Use</h1>
                                        <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                        <div className="popular-session-solution flex">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <p>999 solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="popular-session flex all-section">
                                    <img src={sach} alt=""/>
                                    <div className="popular-session-content">
                                        <h1>English Grammar in Use</h1>
                                        <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
                                        <div className="popular-session-solution flex">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <p>999 solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="top-creators margin-bottom-50 padding-16">
                        <h2 className="h2">Top creators</h2>
                        <div className="top-creators-main flex">
                            <a href="">
                                <div className="top-creators-main-sesstion all-section">
                                    <img src={account} alt=""/>
                                    <div className="creator-in4">
                                        <div className="creator-rule flex">
                                            <h3>Thien</h3>
                                            <div className="creator-rule-important">
                                                <p>Teacher</p>
                                            </div>
                                        </div>
                                        <div className="creator-tag flex">
                                            <div className="flex khung-mo-ta">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <p>flashcard sets</p>
                                            </div>
                                            <div className="flex khung-mo-ta">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <p>0 classNamees</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="top-creators-main-sesstion all-section">
                                    <img src={account} alt=""/>
                                    <div className="creator-in4">
                                        <div className="creator-rule flex">
                                            <h3>Thien</h3>
                                            <div className="creator-rule-important">
                                                <p>Teacher</p>
                                            </div>
                                        </div>
                                        <div className="creator-tag flex">
                                            <div className="flex khung-mo-ta">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <p>flashcard sets</p>
                                            </div>
                                            <div className="flex khung-mo-ta">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <p>0 classNamees</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="top-creators-main-sesstion all-section">
                                    <img src={account} alt=""/>
                                    <div className="creator-in4">
                                        <div className="creator-rule flex">
                                            <h3>Thien</h3>
                                            <div className="creator-rule-important">
                                                <p>Teacher</p>
                                            </div>
                                        </div>
                                        <div className="creator-tag flex">
                                            <div className="flex khung-mo-ta">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <p>flashcard sets</p>
                                            </div>
                                            <div className="flex khung-mo-ta">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <p>0 classNamees</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="footer flex">
                        <div className="footer-other flex">
                            <a href="">
                                <p>Privacy</p>
                            </a>
                            <a href="">
                                <p>Terms</p>
                            </a>
                        </div>
                        <div className="footer-language">
                            <p>English</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}