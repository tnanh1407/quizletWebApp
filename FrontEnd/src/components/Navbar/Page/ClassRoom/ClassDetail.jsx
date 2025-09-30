import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { classroomApi } from "../../../../api/classroomApi";
import { flashCardApi } from "../../../../api/flashCardApi";
import { getUser } from "../../../../other/storage";
import Footer from "../../../Footer/Footer";
import Modal from "../../../Modal/Modal";

// ICONS
import { LuUniversity } from "react-icons/lu";
import { TbCards } from "react-icons/tb";

import "./CssClassDetail.css";

export default function ClassDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = getUser();

  const [flashCards, setFlashCards] = useState([]);
  const [selectedFlashcards, setSelectedFlashcards] = useState([]);
  const [classRoom, setClassRoom] = useState(null);
  const [classFlashcards, setClassFlashcards] = useState([]);
  const [isAddFlashCard, setIsAddFlashCard] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Get all flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await flashCardApi.getAll();
        setFlashCards(data);
      } catch (error) {
        console.log("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, []);

  // Get class by Id
  useEffect(() => {
    let isMounted = true;
    classroomApi
      .getById(id)
      .then((data) => {
        if (!isMounted) return;
        setClassRoom(data);
        if (data.flashCards) {
          setClassFlashcards(
            flashCards.filter((fc) => data.flashcards.includes(fc._id))
          );
        }
      })
      .catch((err) => console.error(err));

    return () => {
      isMounted = false;
    };
  }, [id, location.state, flashCards]);

  // Toggle add flashcard modal
  const toggleAddFlashCard = () => {
    setIsAddFlashCard((prev) => !prev);
  };

  // Toggle choose flashcard
  const toggleChoose = (flashcardId) => {
    setSelectedFlashcards((prev) =>
      prev.includes(flashcardId)
        ? prev.filter((id) => id !== flashcardId)
        : [...prev, flashcardId]
    );
  };

  // Delete class
  const handleDelete = async () => {
    try {
      await classroomApi.delete(id);
      alert("Deleted successfully");
      navigate(-1, { state: { deleted: true } });
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  // Add flashcards to class
  const handleDone = async () => {
    try {
      const updatedClass = await classroomApi.addFlashcards(
        id,
        selectedFlashcards
      );
      setClassRoom(updatedClass);

      const classFlashcardsIds = updatedClass.flashcards || [];
      const updatedClassFlashcards = flashCards.filter((fc) =>
        classFlashcardsIds.includes(fc._id)
      );
      setClassFlashcards(updatedClassFlashcards);

      alert("Added successfully");
      setIsAddFlashCard(false);
    } catch (error) {
      console.log("id flash card:", classRoom.flashcards.id);
      console.error("Error adding flashcards:", error);
      alert("Error adding flashcards");
    }
  };

  // Remove flashcard from class
  const handleRemoveFlashcard = async (flashcardId) => {
    try {
      const updatedClass = await classroomApi.removeFlashcard(id, flashcardId);
      setClassRoom(updatedClass);
      const classFlashcardsIds = updatedClass.flashcards || [];
      setClassFlashcards(
        flashCards.filter((fc) => classFlashcardsIds.includes(fc._id))
      );
      alert("Removed successfully");
    } catch (err) {
      console.error("Error removing flashcard:", err);
      alert("Error removing flashcard");
    }
  };

  //
  useEffect(() => {
    if (classRoom && flashCards.length > 0) {
      const cardsInClass = flashCards.filter((fc) =>
        classRoom.flashcards?.includes(fc._id)
      );
      setClassFlashcards(cardsInClass);
    }
  }, [classRoom, flashCards]);

  return (
    <>
      <div className="ClassDetail">
        {/* Notice bar */}
        <div className="element-notice">
          <h5>Invite students to join this class</h5>
          <p>
            Students get free access to activities and materials you add to your
            class
          </p>
        </div>

        {/* Header */}
        <div className="header_classDetail">
          <div className="header_one">
            <div className="header_one_l">
              <h1>{classRoom?.title}</h1>
              <span className="l_school flex">
                <LuUniversity className="icon-univer" />
                {classRoom?.university}
              </span>
            </div>
            <div className="header_one_r">
              <button className="share-btn" onClick={toggleAddFlashCard}>
                <i className="fa-solid fa-plus"></i>
              </button>

              {classRoom?.creator.user_id === user.id && (
                <div className="menu-container">
                  <button
                    className="menu-toggle"
                    onClick={() => setShowMenu((prev) => !prev)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>

                  {showMenu && (
                    <div className="dropdown-menu">
                      <Link to={`/edit-flashcard/${id}`} className="flex">
                        <i className="fa-solid fa-pen"></i>
                        <p>Edit</p>
                      </Link>
                      <button onClick={handleDelete} className="flex delete">
                        <i className="fa-solid fa-trash"></i>
                        <p>Delete</p>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal add flashcards */}
        {isAddFlashCard && (
          <Modal onClose={toggleAddFlashCard} className="add-flash-card">
            <div className="add-flash-cards">
              <div className="add-flash-cards-header">
                <h1>Add Flash Cards</h1>
                <button onClick={toggleAddFlashCard}>
                  <i className="fa-solid fa-xmark add-flash-cards-icon"></i>
                </button>
              </div>

              <div className="add-flash-cards-create flex">
                <p>Your Flash Clash</p>
                <Link to="/create/new-flashcard" className="flex">
                  <i className="fa-solid fa-plus"></i>
                  <p>Create new</p>
                </Link>
              </div>

              {flashCards
                .filter(
                  (card) =>
                    card.delete_flashcard === false &&
                    user &&
                    String(card.creator.user_id) === String(user.id)
                )
                .map((card) => {
                  const cardId = card._id;
                  const isChosen =
                    selectedFlashcards.includes(cardId) ||
                    classRoom?.flashcards?.includes(cardId);

                  return (
                    <div
                      className="recent flex"
                      id="add-flash-card"
                      key={cardId}
                    >
                      <div className="flash-card-left flex">
                        <div className="recent-icon">
                          <TbCards className="icon-flash-card icon-flash-card-recent" />
                        </div>
                        <div className="recent-content">
                          <p>{card.title || "Untitled"}</p>
                          <p>
                            Flashcard set • {card.content_count || 0} terms • by{" "}
                            {card.creator?.username || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => toggleChoose(cardId)}>
                        {isChosen ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-plus"></i>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="add-flash-cards-footer flex">
              <button onClick={handleDone}>
                <p>Done</p>
              </button>
            </div>
          </Modal>
        )}

        {/* Tabs */}
        <div className="header_two">
          <NavLink to={`/class/${classRoom?._id}/material`}>
            <button
              className={`tab ${
                location.pathname.includes("material") ? "active" : ""
              }`}
            >
              Materials
            </button>
          </NavLink>
          <NavLink to={`/class/${classRoom?._id}/member`}>
            <button
              className={`tab ${
                location.pathname.includes("member") ? "active" : ""
              }`}
            >
              Members
            </button>
          </NavLink>
        </div>

        {/* Invite buttons */}
        <div className="header_three">
          <button className="invite google">📂 Invite with Google</button>
          <button className="invite email">✉️ Invite by email</button>
          <button className="invite link">🔗 Copy link</button>
        </div>

        {/* Content */}
        <div className="content">
          <Outlet
            context={{
              flashcards: classFlashcards,
              onRemoveFlashcard: handleRemoveFlashcard,
            }}
          />
        </div>
      </div>
      <Footer className="footer" />
    </>
  );
}
