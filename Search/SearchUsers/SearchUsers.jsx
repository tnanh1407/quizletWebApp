import "./CssSearchUsers.css";
import "../CssSearch.css";
import SectionUser from "../../Sections/SectionSearch/SectionUsers/SectionUser";

export default function SearchUsers() {
  return (
    <>
       <h2 className="section-title">
        Users <a href="#" className="view-all">View all</a>
      </h2>
      <SectionUser />
      <SectionUser />
    </>
  );
}
