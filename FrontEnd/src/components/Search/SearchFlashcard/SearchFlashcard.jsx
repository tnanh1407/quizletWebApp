import "./CssSearchFlashcard.css";
import "../CssSearch.css";
import SectionFlashCard from "../../Sections/SectionSearch/SectionFlashCard/SectionFlashCard";

export default function SearchFlashcard() {
  return (
    <>
      <h2 className="section-title">
        Flashcard sets<span className="view-all">View all</span>
      </h2>
      <div className="flashcard-grid">
        <SectionFlashCard />
        <SectionFlashCard />
        <SectionFlashCard />
      </div>
    </>
  );
}
