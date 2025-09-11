import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import account from "../../assets/img/account.jpg";

export default function Navbar({ togglePadding }) {
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
    togglePadding();
  };

  const [activeItem, setActiveItem] = useState("home");
  // const location = useLocation();
  const handleActive = (item) => {
    setActiveItem(item);
  };

  const [isNewFolder, setIsNewFolder] = useState(false);

  const toggleNewFolder = () => {
    setIsNewFolder(!isNewFolder);
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
          <Link to="/" onClick={() => handleActive("home")}>
            <div
              className={`navbar-a flex ${
                activeItem === "home" ? "active" : ""
              }`}
              id="navbar-one-home"
            >
              <i className="fa-solid fa-house"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Home</p>
            </div>
          </Link>
          <Link to="/library" onClick={() => handleActive("library")}>
            <div
              className={`navbar-a flex ${
                activeItem === "library" ? "active" : ""
              }`}
              id="navbar-one-library"
            >
              <i className="fa-solid fa-folder-open"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Your library</p>
            </div>
          </Link>
          <button id="click-notifi" onClick={toggleContent}>
            <div
              className={`navbar-a flex ${isOpen ? "active" : ""}`}
              id="navbar-one-notifi"
            >
              <i className="fa-solid fa-bell"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Notifications</p>
            </div>
          </button>
          <div
            id="notifications-main"
            className={isOpen ? "block" : "hidden"}
            ref={notificationsRef}
          >
            <Link to="/">
              <div className="notifi-main-children flex">
                <img src={account} alt="" />
                <div className="notifi-main-content">
                  <h1>
                    Way to go! You're on a 2 day week.
                    <strong>Keep up the momentum and study again</strong>
                    <span>1 hours ago</span>
                  </h1>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-two">
          <p className={isCollapsed ? "hidden" : "block"}>Your folders</p>
          <Link to="/demo" onClick={() => handleActive("demo")}>
            <div
              className={`navbar-a flex ${
                activeItem === "demo" ? "active" : ""
              }`}
              id="navbar-one-demo"
            >
              <i className="fa-solid fa-folder"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Demo</p>
            </div>
          </Link>
          <button id="click-notifi" onClick={toggleNewFolder}>
            <div className={`navbar-a flex `} id="navbar-one-notifi">
              <i className="fa-solid fa-plus"></i>
              <p className={isCollapsed ? "hidden" : "block"}>New folder</p>
            </div>
          </button>
          <div id="newfolder" className={isNewFolder ? "block" : "hidden"}>
            <div className="newfolder-main">
              <p>
                <i className="fa-solid fa-folder"></i>
              </p>
              <input
                type="text"
                placeholder="Name your folder"
                className="input-name-new-folder"
              />
              <div className="newfolder-main-button flex">
                <button className="newfolder-create">
                  <span>
                    <Link to="">Tạo</Link>
                  </span>
                </button>
                <button className="newfolder-cancel" onClick={toggleNewFolder}>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-three">
          <p className={isCollapsed ? "hidden" : "block"}>Start here</p>
          <Link to="/flashcards" onClick={() => handleActive("flashcards")}>
            <div
              className={`navbar-a flex ${
                activeItem === "flashcards" ? "active" : ""
              }`}
              id="navbar-one-flash-cards"
            >
              <i className="fa-solid fa-address-card"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Flashcards</p>
            </div>
          </Link>
          <Link
            to="/expert-solutions"
            onClick={() => handleActive("expert-solutions")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "expert-solutions" ? "active" : ""
              }`}
              id="navbar-one-expert-solutions"
            >
              <i className="fa-solid fa-book"></i>
              <p className={isCollapsed ? "hidden" : "block"}>
                Expert Solutions
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
