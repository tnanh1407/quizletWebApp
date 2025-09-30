import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "../../../Footer/Footer.jsx";
import "./CssYourLibrary.css";

export default function YourLibrary() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active-items" : "";
  };
  return (
    <>
      <div className="main-content-library">
        <h1>Your library</h1>
        <menu className="main-content-items flex">
          <Link to="/your-library/flashcards">
            <div className={`items ${isActive("/your-library/flashcards")}`}>
              <p>Flash Card</p>
            </div>
          </Link>
          <Link to="/your-library/folders">
            <div className={`items ${isActive("/your-library/folders")}`}>
              <p>Folders</p>
            </div>
          </Link>
          <Link to="/your-library/classes">
            <div className={`items ${isActive("/your-library/classes")}`}>
              <p>Classes</p>
            </div>
          </Link>
          <Link to="/your-library/test">
            <div className={`items ${isActive("/your-library/test")}`}>
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
