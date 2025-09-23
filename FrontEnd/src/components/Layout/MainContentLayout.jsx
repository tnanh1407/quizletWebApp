import { Outlet } from "react-router-dom";

export default function MainContentLayout({ isPadded }) {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
