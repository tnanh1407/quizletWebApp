import { useState } from "react";
import { Link } from "react-router-dom";

export default function ItemsSeeDemo(props) {
  const [isTagOrRemoveTags, setIsTagOrRemoveTags] = useState(false);

  const toggleTagOrRemoveTags = () => {
    setIsTagOrRemoveTags(!isTagOrRemoveTags);
  };

  return (
    <>
      <section id="item-folder">
        <button
          className="item-folder-button-option"
          onClick={toggleTagOrRemoveTags}
        >
          <div className="button-option">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </button>
        <div
          id="item-folder-button-option-menu"
          className={isTagOrRemoveTags ? "block" : "hidden"}
        >
          <button className="flex" onClick={props.onToggle}>
            <i class="fa-solid fa-tag"></i>
            <h3>Tag or remove tags</h3>
          </button>
          <button className="flex">
            <i class="fa-solid fa-minus"></i>
            <h3>Remove from folder</h3>
          </button>
        </div>
        <Link to="/flashcards" className="">
          <div className="item-folder-main flex">
            <div className="item-folder-main-icon-card">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div className="item-folder">
              <h1>demo</h1>
              <p>Flashcard set • 2 terms • by you</p>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
