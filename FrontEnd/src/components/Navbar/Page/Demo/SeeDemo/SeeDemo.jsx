import { Link, Outlet } from "react-router-dom";
import Footer from "../../../../Footer/Footer.jsx";

export default function SeeDemo({ isPadded }) {
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "20px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <div className="main-content-new-folder">
            <div className="new-folder-header flex">
              <h1>Demo</h1>
              <div className="study-other flex">
                <p>Study</p>
                <button className="other-new-folder">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
            <div className="new-folder-main">
              <div className="new-folder-main-filter">
                <button className="filter-add">
                  <p>All</p>
                </button>
                <button className="new-folder-filter-add">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="new-folder-maincontent"></div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
