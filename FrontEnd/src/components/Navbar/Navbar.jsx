import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import account from "../../assets/img/account.jpg";

export default function Navbar({ togglePadding }) {
  const [isOpen, setIsOpen] = useState(false); // chỉ cho thông báo
  const [isCollapsed, setIsCollapsed] = useState(false); // chỉ cho navbar
  const [activeItem, setActiveItem] = useState("home");
  const [isNewFolder, setIsNewFolder] = useState(false);

  const navbarRef = useRef(null);
  const notificationsRef = useRef(null);
  const buttonRef = useRef(null);

  // ✅ Collapse: độc lập, không phụ thuộc isOpen
  const handleCollapse = () => {
    if (navbarRef.current) {
      if (!isCollapsed) {
        navbarRef.current.style.width = "67px";
        // notificationsRef.current.style.left = "50px";
      } else {
        navbarRef.current.style.width = "";
        // notificationsRef.current.style.left = "";
      }
    }
    setIsCollapsed((prev) => !prev);
    togglePadding();
  };

  // ✅ Đóng thông báo khi click ra ngoài (không gọi handleCollapse ở đây nữa)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false); // chỉ đóng noti, không động tới collapse
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleNewFolder = () => {
    setIsNewFolder((prev) => !prev);
  };

  return (
    <>
      <div className="button-navbar">
        <button id="click-navbar" onClick={handleCollapse}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <nav className="navbar" id="navbar" ref={navbarRef}>
        {/* --- Navbar One --- */}
        <div className="navbar-one">
          <Link to="/" onClick={() => setActiveItem("home")}>
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

          <Link to="/library" onClick={() => setActiveItem("library")}>
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

          {/* Notifications */}
          <button
            id="click-notifi"
            className="flex"
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <div
              className={`navbar-a flex ${isOpen ? "active" : ""}`}
              id="navbar-one-notifi"
            >
              <i className="fa-solid fa-bell"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Notifications</p>
            </div>
            <div className="position-notifi">
              {isOpen && (
                <div id="notifications-main" ref={notificationsRef}>
                  <Link to="/achievenments">
                    <div className="notifi-main-children flex">
                      <img src={account} alt="" />
                      <div className="notifi-main-content">
                        <h1>
                          Way to go! You're on a 2 day week.
                          <strong>
                            {" "}
                            Keep up the momentum and study again{" "}
                          </strong>
                          <span>1 hour ago</span>
                        </h1>
                      </div>
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* --- Navbar Two --- */}
        <div className="navbar-two">
          <p className={isCollapsed ? "hidden" : "block"}>Your folders</p>

          <Link to="/demo" onClick={() => setActiveItem("demo")}>
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
            <div className="navbar-a flex" id="navbar-one-notifi">
              <i className="fa-solid fa-plus"></i>
              <p className={isCollapsed ? "hidden" : "block"}>New folder</p>
            </div>
          </button>

          {isNewFolder && (
            <div id="newfolder">
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
                      <Link to="">Create</Link>
                    </span>
                  </button>
                  <button
                    className="newfolder-cancel"
                    onClick={toggleNewFolder}
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- Navbar Three --- */}
        <div className="navbar-three">
          <p className={isCollapsed ? "hidden" : "block"}>Start here</p>

          <Link to="/flashcards" onClick={() => setActiveItem("flashcards")}>
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
            onClick={() => setActiveItem("expert-solutions")}
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
