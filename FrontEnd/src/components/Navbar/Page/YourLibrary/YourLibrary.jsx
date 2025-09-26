import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../../../Footer/Footer.jsx";
import "./CssYourLibrary.css";

export default function YourLibrary() {
  const [activeContentItem, setActiveContentItem] = useState("flashcard");
  // const location = useLocation();
  const handleActiveContent = (item) => {
    setActiveContentItem(item);
  };
  return (
    <>
      <div className="main-content-library">
        <h1>Your library</h1>
        <menu className="main-content-items flex">
          <Link
            to="/your-library/flashcards"
            onClick={() => handleActiveContent("flashcard")}
          >
            <div
              className={`items ${
                activeContentItem === "flashcard" ? "active-items" : ""
              }`}
            >
              <p>Flash Card</p>
            </div>
          </Link>
          <Link
            to="/your-library/folders"
            onClick={() => handleActiveContent("folders")}
          >
            <div
              className={`items ${
                activeContentItem === "folders" ? "active-items" : ""
              }`}
            >
              <p>Folders</p>
            </div>
          </Link>
          <Link
            to="/your-library/classes"
            onClick={() => handleActiveContent("classes")}
          >
            <div
              className={`items ${
                activeContentItem === "classes" ? "active-items" : ""
              }`}
            >
              <p>Classes</p>
            </div>
          </Link>
          <Link
            to="/your-library/test"
            onClick={() => handleActiveContent("practive-tests")}
          >
            <div
              className={`items ${
                activeContentItem === "practive-tests" ? "active-items" : ""
              }`}
            >
              <p>Practice Tests</p>
            </div>
          </Link>
        </menu>
      </div>
      <div className="out-let">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
