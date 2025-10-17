import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DashBoardLayOut.css";

// ĐỊNH NGHĨA TÊN CLASS ĐỘC LẬP
const LIGHT_MODE_CLASS = "admin-theme-light";
const DARK_MODE_CLASS = "admin-theme-dark";

export default function DashBoardLayOut() {
  // Khởi tạo theme từ localStorage hoặc mặc định
  const [themeClass, setThemeClass] = useState(
    localStorage.getItem("themeClass") || LIGHT_MODE_CLASS
  );

  // Áp dụng class theme cho thẻ <body>
  useEffect(() => {
    document.body.className = themeClass;
    localStorage.setItem("themeClass", themeClass);
  }, [themeClass]);

  // Function để chuyển đổi theme
  const toggleTheme = () => {
    setThemeClass((currentClass) =>
      currentClass === LIGHT_MODE_CLASS ? DARK_MODE_CLASS : LIGHT_MODE_CLASS
    );
  };

  const isDarkMode = themeClass === DARK_MODE_CLASS;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2>DashBoard Quizlet</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/dashboard/overview"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/dashboardflashcard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Flashcard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/comingsoon"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Coming Soon
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Nút chuyển đổi Theme */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
          aria-label={`Chuyển sang chế độ ${isDarkMode ? "sáng" : "tối"}`}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
