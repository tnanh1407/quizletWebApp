import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import QuizletBook from "../assets/img/quizlet-books.png";
import "./Sign-Layout.css";

export default function SignLayOut() {
  const [activeItem, setActiveItem] = useState("flashcard");
  // const location = useLocation();
  const handleActiveContent = (item) => {
    setActiveItem(item);
  };
  return (
    <>
      <div className="signin-signup">
        <img src={QuizletBook} alt="" />
        <div className="form-sign">
          <div className="option-form-sign flex">
            <Link
              to="/sign-in"
              onClick={() => handleActiveContent("flashcard")}
            >
              <div
                className={`itemss ${
                  activeItem === "flashcard" ? "active-itemss" : ""
                }`}
              >
                <p>Sign In</p>
              </div>
            </Link>
            <Link to="/sign-up" onClick={() => handleActiveContent("folders")}>
              <div
                className={`itemss ${
                  activeItem === "folders" ? "active-itemss" : ""
                }`}
              >
                <p>Sign Up</p>
              </div>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
