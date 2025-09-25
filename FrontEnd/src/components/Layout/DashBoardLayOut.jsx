import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import "./DashBoardLayOut.css";
export default function DashBoardLayOut() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={`dashboard-layout ${isDark ? "dark" : "light"}`}
      style={{ display: "flex", minHeight: "100vh" }}
    >
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav className="menu">
          <ul>
            <li>
              <NavLink to="overview">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="users">Users</NavLink>
            </li>
            <li>
              <NavLink to="sets">Flashcard Sets</NavLink>
            </li>
            <li>
              <NavLink to="analytics">Analytics</NavLink>
            </li>
            <li>
              <NavLink to="reports">Reports</NavLink>
            </li>
            <li>
              <NavLink to="settings">Settings</NavLink>
            </li>
          </ul>
        </nav>

        {/* nút toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{ marginTop: "20px", padding: "6px 12px", cursor: "pointer" }}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h1>DashBoard cha</h1>
        <Outlet />
      </main>
    </div>  
  );
}
