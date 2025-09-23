import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import account from "../../assets/img/account.jpg";
import { flashCardApi } from "../../api/flashCardApi";
import { folderApi } from "../../api/folderApi"; // 👈 import folderApi
import iconFlashCard from "../../assets/icon/navbar-card.png";
import "./CssNavbar.css";
import { useParams } from "react-router-dom";
import SectionAddFlashCard from "../Sections/SectionAddFlashCard/SectionAddFlashCard";

export default function Navbar({ togglePadding }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [folderName, setFolderName] = useState(""); // 👈 state cho input folder
  const [flashCards, setFlashCards] = useState([]);
  const [folders, setFolders] = useState([]); // 👈 lưu danh sách folder

  const navbarRef = useRef(null);
  const notificationsRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await flashCardApi.getAll();
      setFlashCards(data);
      const folderData = await folderApi.getAll();
      setFolders(folderData);
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

  // 👇 Hàm tạo folder bằng folderApi
  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      alert("Tên folder không được để trống!");
      return;
    }

    try {
      const newFolder = await folderApi.create({ title: folderName }); // 👈 gọi folderApi
      console.log("Folder created:", newFolder);

      // cập nhật danh sách folder trong state
      setFolders((prev) => [...prev, newFolder]);

      // reset input + đóng modal
      setFolderName("");
      setIsNewFolder(false);
      // điều hướng sang trang danh sách folder
      navigate(`/folder/${newFolder._id}`);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
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

          <Link
            to="/your-library/flashcards"
            onClick={() => setActiveItem("profile")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "profile" ? "active" : ""
              }`}
              id="navbar-one-library"
            >
              <i className="fa-solid fa-user"></i>
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

        {/* --- Navbar Two --- */}
        <div className="navbar-two">
          <p className={isCollapsed ? "hidden" : "block"}>Your library</p>

          <Link
            to="/your-library/flashcards"
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

          <Link
            // to="/your-folder"
            to="/your-library/folders"
            onClick={() => setActiveItem("folder")}
          >
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
            to="/your-library/classes"
            onClick={() => setActiveItem("classrooms")}
          >
            <div
              className={`navbar-a flex ${
                activeItem === "classrooms" ? "active" : ""
              }`}
              id="navbar-one-library"
            >
              <i className="fa-solid fa-people-group"></i>
              <p className={isCollapsed ? "hidden" : "block"}>Classes</p>
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

          {/* Nút mở modal new folder */}
          <button id="click-notifi" onClick={toggleNewFolder}>
            <div className="navbar-a flex" id="navbar-one-notifi">
              <i className="fa-solid fa-plus"></i>
              <p className={isCollapsed ? "hidden" : "block"}>New folder</p>
            </div>
          </button>

          {/* Modal new folder */}
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
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="newfolder-main-button flex">
                  <button
                    className="newfolder-create"
                    onClick={handleCreateFolder}
                  >
                    <span>Create</span>
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
