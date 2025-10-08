import "./CssQuestion.css";
import "../CssSearch.css";
import SectionQuestion  from "../../Sections/SectionSearch/SectionQuestion/SectionQuestion";

export default function SearchQuestions() {
    return(
         <>
      <div className="section-header">
        <h2>Questions</h2>
        <a href="#" className="view-all">View all</a>
      </div>

      <div className="card-grid">
        <SectionQuestion />
        <SectionQuestion />
      </div>
      </>
    )
}