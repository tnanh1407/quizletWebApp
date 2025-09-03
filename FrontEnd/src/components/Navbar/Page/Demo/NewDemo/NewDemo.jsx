import { Link, Outlet } from "react-router-dom";
import Footer from "../../../../Footer/Footer.jsx";

export default function NewDemo({ isPadded }) {
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "20px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <div className="main-content-new-folder">
            <div className="new-folder-header flex">
              <h1>NewDemo</h1>
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
              <div className="new-folder-maincontent">
                <div className="new-folder-main-content">
                  <img src="" alt="" />
                  <h2>Let's start building your folder</h2>
                  <button>Add study materials</button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
