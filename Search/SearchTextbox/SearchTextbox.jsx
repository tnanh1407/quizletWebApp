import "./CssSearchUsers.css";
import "../CssSearch.css";
import SectionTextbox from "../../Sections/SectionSearch/SectionTextbox/SectionTextbox";

export default function SearchTextboxs() {
    return(
        <>
        <h2 className="section-title">
        Textbooks <span className="view-all">View all</span>
      </h2>
      <div className="flashcard-grid">
      <SectionTextbox/>
      </div>
      </>
    )
}