import "./CssSearchClasses.css";
import "../CssSearch.css";
import { Link } from "react-router-dom";

import SectionClass from "../../Sections/SectionSearch/SectionClasses/SectionClass";

export default function SearchClasses() {
  return (
    <>
      <h2 className="section-title">
        Classes{" "}
        <Link to="/search/classes" className="view-all">
          View all
        </Link>
      </h2>
      <div className="card-grid">
        <SectionClass />
        <SectionClass />
      </div>
    </>
  );
}
