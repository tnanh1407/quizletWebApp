import "./CssSearchPracticeCard.css";
import "../CssSearch.css";
import SectionPracticeCard from "../../Sections/SectionSearch/SectionPracticeCard/SectionPracticeCard";

export default function SearchClassesPracticeCards(){
    return(
        <>
        <h2>Practice tests</h2>
        <a href="#" className="view-all">View all</a>
         <div className="card-grid">
            <SectionPracticeCard/>
         </div>
        </>
    );
}
