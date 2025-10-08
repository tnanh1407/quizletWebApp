import "./CssSearchTextbox.css";
import "../CssSearch.css";
import SectionTextbox from "../../Sections/SectionSearch/SectionTextbox/SectionTextbox";

export default function SearchTextboxs() {
    return(
        <>
        <h2 className="section-title">
        Textbooks <a href="#" className="view-all">View all</a>
        </h2>
          <div className="flashcard-grid">
            <SectionTextbox />
          </div>
      </>
    )
}