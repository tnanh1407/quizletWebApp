import { flashCardApi } from "../../../../api/flashCardApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconFlashCard from "../../../../assets/icon/cards.png";

export default function SectionRecentItem() {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await flashCardApi.getAll();
      setFlashCards(data);
    };

    fetchData();
  }, []);
  return (
    <>
      {flashCards
        .filter((card) => card.delete_flashcard === false)
        .slice(0, 6)
        .map((card) => (
          <Link to={`/itemflashcard/${card._id}`} key={card._id}>
            <div className="recent flex">
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
          </Link>
        ))}
    </>
  );
}
