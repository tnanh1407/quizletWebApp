import { Link, Outlet } from "react-router-dom";
import Footer from "../../../../Footer/Footer.jsx";
import ItemsSeeDemo from "./Items/ItemsSeeDemo.jsx";

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
              <h1>SeeDemo</h1>
              <div className="study-other flex">
                <Link to="/">
                  <p>Study</p>
                </Link>
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
              <div className="see-folder-maincontent flex">
                <button className="see-folder-button-recent">
                  <div className="see-folder-button-recent-main flex">
                    <p>Recent</p>
                    <i class="fa-solid fa-arrows-up-down"></i>
                  </div>
                </button>
                <div className="see-folder-filter flex">
                  <button className="see-folder-button-material flex">
                    <div className="see-folder-button-material-main flex">
                      <i class="fa-solid fa-plus"></i>
                      <p>Material</p>
                    </div>
                  </button>
                  <div className="see-folder-search">
                    <input type="text" placeholder="Search this folder" />
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
              </div>
              <div className="see-folder-main-items">
                <ItemsSeeDemo />
                <ItemsSeeDemo />
                <ItemsSeeDemo />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
