import SectionFlashCardSet from "../../../../../Sections/SectionFlashCardSet/SectionFlashCardSet";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CssFlashCard.css";
import { userApi } from "../../../../../../api/userApi";
import { getUser } from "../../../../../../other/storage";

export default function YourFlashCard() {
  const { id } = useParams();
  const user = getUser();
  const [isFilterCard, setIsFilterCard] = useState(false);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    if (id && String(id) !== String(user.id)) {
      userApi
        .getByIdPublic(id)
        .then((res) => {
          console.log("API getByIdPublic:", res);
          setCreator(res);
        })
        .catch((err) => console.error("Error fetch public user:", err));
    } else {
      setCreator(user);
    }
  }, [id]);

  const toggleFilterCard = () => {
    setIsFilterCard(!isFilterCard);
  };
  return (
    <>
      <div className="flashcard-set">
        {String(id || user.id) === String(user.id) ? (
          <div className="flashcardsearch">
            <div className="flashcard-option">
              <button className="flex" onClick={toggleFilterCard}>
                <p>Created</p>
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
        ) : null}
        <SectionFlashCardSet />
      </div>
    </>
  );
}
