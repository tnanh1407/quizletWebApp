import "./CssSearchFlashcard.css";
import "../CssSearch.css";
import { Link } from "react-router-dom";
import SectionFlashCard from "../../Sections/SectionSearch/SectionFlashCard/SectionFlashCard";

export default function SearchFlashcard() {
  return (
    <>
      <h2 className="section-title">
        Flashcard sets
        <Link to="/search/flashcard" className="view-all">
          View all
        </Link>
      </h2>
      <div className="flashcard-grid">
        <SectionFlashCard />
        <SectionFlashCard />
        <SectionFlashCard />
      </div>
    </>
  );
}
