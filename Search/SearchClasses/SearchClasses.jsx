import "./CssSearchClasses.css";
import "../CssSearch.css";
import SectionClass from "../../Sections/SectionSearch/SectionClasses/SectionClass";

export default function SearchClasses() {
  return (
    <>
      <h2 className="section-title">
        Classes <a href="#" className="view-all">View all</a>
      </h2>
      <div className="card-grid">
      <SectionClass />
      <SectionClass />
      </div>
    </>
  );
}
