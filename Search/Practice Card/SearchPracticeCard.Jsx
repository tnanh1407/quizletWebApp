import "./CssSearchPracticeCard.css";
import "../CssSearch.css";
import SectionPracticeCard from "../../Sections/SectionSearch/SectionPracticeCard/SectionPracticeCard";

export default function SearchPracticeCards(){
    return(
        <>
        <h2>Practice tests</h2>
        <span className="view-all">View all</span>
         <div className="card-grid">
            <SectionPracticeCard/>
             <SectionPracticeCard/>
         </div>
        </>
    );
}
