import { Outlet, NavLink } from "react-router-dom";
import "./DashBoardLayOut.css"; // bạn có thể tạo file CSS để style menu

export default function DashBoardLayOut() {
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
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
