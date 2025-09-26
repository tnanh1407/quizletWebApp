import { Link } from "react-router-dom";

export default function SectionFolder() {
  return (
    <section className="sectionfolder">
      <Link>
        <div className="main-flashcard">
          <div className="flashcard-creator flex">
            <p>2 terms</p>
          </div>
          <div className="nameflashcard flex">
            <i class="fa-regular fa-folder"></i>
            <h1>Demo</h1>
          </div>
        </div>
      </Link>
    </section>
  );
}
