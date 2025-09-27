import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import QuizletBook from "../assets/img/quizlet-books.png";
import "./Sign-Layout.css";

export default function SignLayOut() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active-itemss" : "";
  };
  return (
    <>
      <div className="signin-signup">
        <img src={QuizletBook} alt="" />
        <div className="form-sign">
          <div className="option-form-sign flex">
            <Link to="/sign-in">
              <div className={`itemss ${isActive("/sign-in")}`}>
                <p>Sign In</p>
              </div>
            </Link>
            <Link to="/sign-up">
              <div className={`itemss ${isActive("/sign-up")}`}>
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
