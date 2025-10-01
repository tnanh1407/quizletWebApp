import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./CssNewFolder.css";
import "../../../../other/Demo/SeeDemo/Items/CssItemsSeeDemo.css";

import { folderApi } from "../../../../api/folderApi";
import { flashCardApi } from "../../../../api/flashCardApi";

import Modal from "../../../Modal/Modal";
import { TbCards } from "react-icons/tb";
import { getUser } from "../../../../other/storage";
import Footer from "../../../Footer/Footer";

export default function NewFolder() {
  const { id } = useParams();
  const [isAddFlashCard, setIsAddFlashCard] = useState(false);
  const [folder, setFolder] = useState(null);
  const [flashCards, setFlashCards] = useState([]);
  const [selectedFlashcards, setSelectedFlashcards] = useState([]);
  const [folderFlashcards, setFolderFlashcards] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [menuFolder, setMenuFolder] = useState(false);

  const user = getUser();
  const navigate = useNavigate();

  // Click ra ngoài để đóng menu folder
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".other-new-folder")) {
        setMenuFolder(false);
      }
    }
    if (menuFolder) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuFolder]);

  // Lấy tất cả flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await flashCardApi.getAll();
        setFlashCards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, []);

  // Lấy folder theo id
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const data = await folderApi.getById(id);
        setFolder(data);
        setSelectedFlashcards(data.flashcards || []);
      } catch (error) {
        console.error("Error fetching folder:", error);
      }
    };
    if (id) fetchFolder();
  }, [id]);

  // Cập nhật folderFlashcards khi folder hoặc flashCards thay đổi
  useEffect(() => {
    if (folder && flashCards.length > 0) {
      const cardsInFolder = flashCards.filter((fc) =>
        folder.flashcards?.includes(fc._id)
      );
      setFolderFlashcards(cardsInFolder);
    }
  }, [folder, flashCards]);

  const toggleAddFlashCard = () => setIsAddFlashCard(!isAddFlashCard);

  const toggleChoose = (flashcardId) => {
    setSelectedFlashcards((prev) =>
      prev.includes(flashcardId)
        ? prev.filter((id) => id !== flashcardId)
        : [...prev, flashcardId]
    );
  };

  const handleDone = async () => {
    try {
      const updatedFolder = await folderApi.addFlashcards(
        id,
        selectedFlashcards
      );

      setFolder(updatedFolder);
      setFolderFlashcards(
        flashCards.filter((fc) => updatedFolder.flashcards.includes(fc._id))
      );
      setSelectedFlashcards(updatedFolder.flashcards);

      alert("Added successfully");
      setIsAddFlashCard(false);
      setMenuOpen(null);
    } catch (error) {
      console.error("Error adding flashcards:", error);
      alert("Error adding flashcards");
    }
  };

  const handleDelete = async () => {
    try {
      await folderApi.delete(id);
      navigate(-1, { state: { deleted: true } });
    } catch (err) {
      console.error("Error deleting folder:", err);
    }
  };

  const handleRemoveFlashcard = async (flashcardId) => {
    try {
      const updatedFolder = await folderApi.removeFlashcard(id, flashcardId);
      setFolder(updatedFolder);
      const updatedFlashcards = updatedFolder.flashcards || [];
      setFolderFlashcards(
        flashCards.filter((fc) => updatedFlashcards.includes(fc._id))
      );
      alert("Removed successfully");
    } catch (err) {
      console.error("Error removing flashcard:", err);
      alert("Error removing flashcard");
    }
  };
  console.log("id tu folder", folder?.creator.user_id);
  console.log("id tu login", user.id);

  return (
    <>
      <div className="main-content-new-folder">
        <div className="new-folder-header flex">
          <div className="new-folder-title">
            <h1>{folder?.title || "Loading..."}</h1>
            {user &&
            folder?.creator?.user_id &&
            String(folder?.creator.user_id) === String(user.id) ? null : (
              <p>Created by {folder?.creator.username}</p>
            )}
          </div>
          <div className="study-other flex">
            <Link to="/" className="stydy-other-a">
              <p>Study</p>
            </Link>
            <button
              className="other-new-folder"
              onClick={() => setMenuFolder((prev) => !prev)}
            >
              <i className="fa-solid fa-ellipsis"></i>
              {menuFolder && (
                <div className="dropdown-menu">
                  <button onClick={handleDelete} className="flex delete">
                    <i className="fa-solid fa-trash"></i>
                    <p>Delete</p>
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="new-folder-main">
          <div className="new-folder-main-filter">
            <button className="filter-add">
              <p>All</p>
            </button>
            <button className="new-folder-filter-add">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <div className="see-folder-maincontent flex">
            <button className="see-folder-button-recent">
              <div className="see-folder-button-recent-main flex">
                <p>Recent</p>
                <i className="fa-solid fa-arrows-up-down"></i>
              </div>
            </button>
            <div className="see-folder-filter flex">
              <button
                className="see-folder-button-material flex"
                onClick={toggleAddFlashCard}
              >
                <div className="see-folder-button-material-main flex">
                  <i className="fa-solid fa-plus"></i>
                  <p>Material</p>
                </div>
              </button>
              <div className="see-folder-search">
                <input type="text" placeholder="Search this folder" />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>

          {/* Hiển thị flashcards trong folder */}
          <div className="see-folder-main-items">
            {folderFlashcards.map((card) => (
              <section key={card._id} id="item-folder">
                <button
                  className="item-folder-button-option"
                  onClick={() =>
                    setMenuOpen(menuOpen === card._id ? null : card._id)
                  }
                >
                  <div className="button-option">
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </button>

                <div
                  id="item-folder-button-option-menu"
                  className={menuOpen === card._id ? "block" : "hidden"}
                >
                  <button
                    className="flex"
                    onClick={() => handleRemoveFlashcard(card._id)}
                  >
                    <i className="fa-solid fa-minus"></i>
                    <h3>Remove from folder</h3>
                  </button>
                </div>

                <Link to={`/itemflashcard/${card._id}`} className="">
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
            ))}
          </div>

          {/* Modal thêm flashcards */}
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
                      folder?.flashcards?.includes(cardId);

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
                              Flashcard set • {card.content_count || 0} terms •
                              by {card.creator?.username || "Unknown"}
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

          {folderFlashcards.length === 0 && !isAddFlashCard && (
            <div className="new-folder-maincontent">
              <div className="new-folder-main-content">
                <h2>Let's start building your folder</h2>
                <button onClick={toggleAddFlashCard}>Add Flash Cards</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
