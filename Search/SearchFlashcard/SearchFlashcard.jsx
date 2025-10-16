import "./CssSearchFlashcard.css";
import "../CssSearch.css";
import { Link } from "react-router-dom";
import SectionFlashCard from "../../Sections/SectionSearch/SectionFlashCard/SectionFlashCard";
import SearchFilter from "./SearchFlashcardAll.jsx";
import Footer from "../../Sections/SectionSearch/SectionFb/SectionFooter.jsx";
import Pagination from "../Pagination/Pagination.jsx"

export default function SearchFlashcardAll() {
  
  return (
    <>
    <div className="SearchFilter">
      <SearchFilter/>
    </div>
      <div className="SearchFlashcard">
             <h2 className="section-title">
                    Flashcard sets
                  </h2>
                  <div className="flashcard-grid">
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard /> 
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
                    <SectionFlashCard />
              </div>
          </div>
          <div className="PreviosAndNext">
            <Pagination/>
          </div>
          <div className="Footer">
            <Footer />
          </div>
    </>
  );
}
