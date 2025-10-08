import React, { useState, useEffect } from "react";
import { TbCards } from "react-icons/tb";
import { Link, useOutletContext, useParams } from "react-router-dom"; // 👈 thêm useOutletContext
import "./CssLearningMaterials.css";
import { getUser } from "../../../../../../other/storage";
import { classroomApi } from "../../../../../../api/classroomApi";

const LearningMaterials = () => {
  const user = getUser();
  const { id } = useParams();
  const { flashcards = [], onRemoveFlashcard } = useOutletContext(); // 👈 lấy từ Outlet context
  const [menuOpen, setMenuOpen] = useState(null);
  const [classRoom, setClassRoom] = useState(null);

  useEffect(() => {
    let isMounted = true;
    classroomApi
      .getById(id)
      .then((data) => {
        if (!isMounted) return;
        setClassRoom(data);
      })
      .catch((err) => console.error(err));

    return () => {
      isMounted = false;
    };
  }, [id, location.state]);

  return (
    <div className="see-folder-main-items">
      {flashcards.length === 0 ? (
        <p>No flashcards yet.</p>
      ) : (
        flashcards.map((card) => (
          <section key={card._id} id="item-folder">
            <button
              className="item-folder-button-option"
              onClick={() =>
                setMenuOpen(menuOpen === card._id ? null : card._id)
              }
            >
              {classRoom?.creator.user_id === user.id && (
                <div className="button-option">
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              )}
            </button>
            <div
              id="item-folder-button-option-menu"
              className={menuOpen === card._id ? "block" : "hidden"}
            >
              <button
                className="flex"
                onClick={() => onRemoveFlashcard(card._id)}
              >
                <i className="fa-solid fa-minus"></i>
                <h3>Remove from class</h3>
              </button>
            </div>

            <Link to={`/itemflashcard/${card._id}`}>
              <div className="item-folder-main flex">
                <div className="item-folder-main-icon-card recent-icon">
                  <TbCards className="icon-flash-card icon-flash-card-recent" />
                </div>
                <div className="item-folder">
                  <h1>{card.title || "Untitled"}</h1>
                  <p>
                    Flashcard set • {card.content_count || 0} terms • by{" "}
                    {card.creator?.username || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        ))
      )}
    </div>
  );
};

export default LearningMaterials;
