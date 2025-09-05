import account from "../../assets/img/account.jpg";
import { Link } from "react-router-dom";

export default function SectionFlashCardSet() {
  return (
    <>
      <section className="sectionflashcardset">
        <div className="header-flashcash flex">
          <p>IN AUGUST 2025</p>
          <div className="header-line"></div>
        </div>
        <Link>
          <div className="main-flashcard">
            <div className="flashcard-creator flex">
              <p>2 terms</p>
              <span className="span"></span>
              <div className="creator-in4 flex">
                <img src={account} alt="" />
                <p>thien2805</p>
              </div>
            </div>
            <div className="nameflashcard">
              <h1>Demo</h1>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
