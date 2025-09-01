import { Link } from "react-router-dom";
import SectionFlashCardSet from "../../../Sections/SectionFlashCardSet";

export default function FlashCard (){
    return(
        <>
            <div className="flashcard-set">
                <div className="flashcardsearch">
                    <div className="flashcard-option">
                        <button className="flex">
                            <p>Recent</p>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className="flashcard-search flex">
                        <input type="text" placeholder="Search flashcards" className="input-research input-research-flashcard"/>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <SectionFlashCardSet/>
                <SectionFlashCardSet/>
                <SectionFlashCardSet/>
                <SectionFlashCardSet/>
                <SectionFlashCardSet/>
                <SectionFlashCardSet/>
            </div>
        </>
    )
}