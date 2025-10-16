import "./CssSearchUsers.css";
import "../CssSearch.css";
import { Link } from "react-router-dom";
import SectionUser from "../../Sections/SectionSearch/SectionUsers/SectionUser";

export default function SearchUsers() {
  return (
    <>
      <h2 className="section-title">
        Users{" "}
        <Link to="/search/user" className="view-all">
          View all
        </Link>
      </h2>
      <div className="card-grid">
        <SectionUser />
        <SectionUser />
      </div>
    </>
  );
}
