import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import account from "../../assets/img/account.jpg";
import { flashCardApi } from "../../api/flashCardApi";
import iconFlashCard from "../../assets/icon/navbar-card.png";
import "./CssNavbar.css";

export default function Navbar({ togglePadding }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isNewFolder, setIsNewFolder] = useState(false);

  const navbarRef = useRef(null);
  const notificationsRef = useRef(null);
  const buttonRef = useRef(null);
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await flashCardApi.getAll();
      setFlashCards(data);
    };

    fetchData();
  }, []);

  const handleCollapse = () => {
    if (navbarRef.current) {
      if (!isCollapsed) {
        navbarRef.current.style.width = "67px";
      } else {
        navbarRef.current.style.width = "";
      }
    }
    setIsCollapsed((prev) => !prev);
    togglePadding();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
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

          <Link to="/your-profile" onClick={() => setActiveItem("profile")}>
            <div
              className={`navbar-a flex ${
                activeItem === "profile" ? "active" : ""
              }`}
              id="navbar-one-library"
            >
              <i class="fa-solid fa-user"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Your profile</p>
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
                <div
                  id="notifications-main"
                  ref={notificationsRef}
                  key={flashCards._id}
                >
                  <Link to={`/itemflashcard/${flashCards._id}`}>
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
        <div className="navbar-two">
          <p className={isCollapsed ? "hidden" : "block"}>Your library</p>

          <Link
            to="/your-flashcard"
            onClick={() => setActiveItem("flashcards")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "flashcards" ? "active" : ""
              }`}
              id="navbar-one-demo"
            >
              <img src={iconFlashCard} alt="" className="icon-flash-card" />
              <p className={isCollapsed ? "hidden" : "block"}>Flash Card</p>
            </div>
          </Link>

          <Link to="/your-folder" onClick={() => setActiveItem("folder")}>
            <div
              className={`navbar-a flex ${
                activeItem === "folder" ? "active" : ""
              }`}
              id="navbar-one-demo"
            >
              <i className="fa-solid fa-folder"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Folder</p>
            </div>
          </Link>
          <Link
            to="/your-classroom"
            onClick={() => setActiveItem("classrooms")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "classrooms" ? "active" : ""
              }`}
              id="navbar-one-library"
            >
              <i class="fa-solid fa-people-group"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Classroom</p>
            </div>
          </Link>
        </div>
        {/* --- Navbar Three --- */}
        <div className="navbar-three">
          <p className={isCollapsed ? "hidden" : "block"}>Create new</p>

          <Link
            to="/create/new-flashcard"
            onClick={() => setActiveItem("flashcard-new")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "flashcard-new" ? "active" : ""
              }`}
              id="navbar-one-flash-cards"
            >
              <i className="fa-solid fa-plus"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Flash Card</p>
            </div>
          </Link>

          <Link
            to="/create/new-folder"
            onClick={() => setActiveItem("folder-new")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "folder-new" ? "active" : ""
              }`}
              id="navbar-one-flash-cards"
            >
              <i className="fa-solid fa-plus"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Folder</p>
            </div>
          </Link>
          <Link
            to="/create/new-classroom"
            onClick={() => setActiveItem("classroom-new")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "classroom-new" ? "active" : ""
              }`}
              id="navbar-one-demo"
            >
              <i className="fa-solid fa-plus"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Class Room</p>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
