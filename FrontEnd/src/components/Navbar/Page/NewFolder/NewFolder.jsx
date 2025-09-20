import { Link, Outlet } from "react-router-dom";
import "./CssNewFolder.css";
import Footer from "../../../Footer/Footer";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../Modal/Modal";
import { folderApi } from "../../../../api/folderApi";
import { flashCardApi } from "../../../../api/flashCardApi";
import iconFlashCard from "../../../../assets/icon/cards.png";

export default function NewFolder() {
  const { id } = useParams();
  const [isAddFlashCard, setIsAddFlashCard] = useState(false);
  const [folder, setFolder] = useState(null);
  const [flashCards, setFlashCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await flashCardApi.getAll();
      setFlashCards(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await folderApi.getById(id); // 👈 gọi API lấy folder theo id
        setFolder(data);
      } catch (error) {
        console.error("Error fetching folder:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const toggleAddFlashCard = () => {
    setIsAddFlashCard(!isAddFlashCard);
  };
  return (
    <>
      <div className="main-content-new-folder">
        <div className="new-folder-header flex">
          <h1>{folder?.title || "Loading..."}</h1>
          <div className="study-other flex">
            <Link to="/" className="stydy-other-a">
              <p>Study</p>
            </Link>
            <button className="other-new-folder">
              <i className="fa-solid fa-ellipsis"></i>
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
          <div className="new-folder-maincontent">
            <div className="new-folder-main-content">
              <img src="" alt="" />
              <h2>Let's start building your folder</h2>
              <button onClick={toggleAddFlashCard}>Add Flash Cards</button>
              {isAddFlashCard && (
                <Modal onClose={toggleAddFlashCard} className="add-flash-card">
                  <div className="add-flash-cards">
                    <div className="add-flash-cards-header">
                      <h1>Add Flash Cards</h1>
                      <button onClick={toggleAddFlashCard}>
                        <i class="fa-solid fa-xmark add-flash-cards-icon"></i>
                      </button>
                    </div>
                    <div className="add-flash-cards-create flex">
                      <p>Your Flash Clash</p>
                      <Link to="/create/new-flashcard" className="flex">
                        <i class="fa-solid fa-plus"></i>
                        <p>Create new</p>
                      </Link>
                    </div>
                    {flashCards
                      .filter((card) => card.delete_flashcard === false)
                      .map((card) => (
                        <div className="recent flex" id="add-flash-card">
                          <div className="flash-card-left flex">
                            <div className="recent-icon">
                              <img
                                src={iconFlashCard}
                                alt=""
                                className="icon-flash-card icon-flash-card-recent"
                              />
                            </div>
                            <div className="recent-content">
                              <p>{card.title || "Untitled"}</p>
                              <p>
                                Flashcard set • {card.content_count} terms • by{" "}
                                {card.creator?.username || "Unknown"}
                              </p>
                            </div>
                          </div>
                          <button>
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="add-flash-cards-footer flex">
                    <button>
                      <p>Done</p>
                    </button>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
