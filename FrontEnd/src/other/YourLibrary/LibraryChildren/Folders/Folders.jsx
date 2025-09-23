import SectionFolder from "../../../../../Sections/SectionFolder.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Folders() {
  const [isFilterFolders, setIsFilterFolders] = useState(false);

  const toggleFilterFolders = () => {
    setIsFilterFolders(!isFilterFolders);
  };
  return (
    <>
      <div className="flashcardsearch">
        <div className="flashcard-option">
          <button className="flex" onClick={toggleFilterFolders}>
            <p>Created</p>
            <i className="fa-solid fa-magnifying-glass"></i>
            <div className={`folder ${isFilterFolders ? "block" : "hidden"}`}>
              <div className="folder-option">
                <Link href="">
                  <div className="setting-item flex">
                    <p>Created</p>
                  </div>
                </Link>
                <Link href="">
                  <div className="setting-item flex">
                    <p>Bookmarked</p>
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
      </div>
      <SectionFolder />
      <SectionFolder />
      <SectionFolder />
    </>
  );
}
