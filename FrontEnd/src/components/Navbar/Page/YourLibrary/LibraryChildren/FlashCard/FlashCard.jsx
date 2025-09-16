import SectionFlashCardSet from "../../../../../Sections/SectionFlashCardSet/SectionFlashCardSet";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FlashCard() {
  const [isFilterCard, setIsFilterCard] = useState(false);

  const toggleFilterCard = () => {
    setIsFilterCard(!isFilterCard);
  };
  return (
    <>
      <div className="flashcard-set">
        <div className="flashcardsearch">
          <div className="flashcard-option">
            <button className="flex" onClick={toggleFilterCard}>
              <p>Recent</p>
              <i className="fa-solid fa-magnifying-glass"></i>
              <div
                className={`recentcard ${isFilterCard ? "block" : "hidden"}`}
              >
                <div className="folder-option">
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Created</p>
                    </div>
                  </Link>
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Recent</p>
                    </div>
                  </Link>
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Studied</p>
                    </div>
                  </Link>
                </div>
              </div>
            </button>
          </div>
          <div className="flashcard-search flex">
            <input
              type="text"
              placeholder="Search flashcards"
              className="input-research input-research-flashcard"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <SectionFlashCardSet />
        <SectionFlashCardSet />
        <SectionFlashCardSet />
        <SectionFlashCardSet />
        <SectionFlashCardSet />
        <SectionFlashCardSet />
      </div>
    </>
  );
}
