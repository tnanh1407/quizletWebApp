import { Link } from "react-router-dom";
export default function ItemsSeeDemo() {
  return (
    <>
      <section id="item-folder">
        <Link className="">
          <div className="item-folder-main flex">
            <div className="item-folder-main-icon-card">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div className="item-folder">
              <h1>demo</h1>
              <p>Flashcard set • 2 terms • by you</p>
            </div>
            <button className="item-folder-button-option">
              <div className="button-option">
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </button>
          </div>
        </Link>
      </section>
    </>
  );
}
