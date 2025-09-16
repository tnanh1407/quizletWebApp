import { flashCardApi } from "../../../../api/flashCardApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      {flashCards.slice(0, 6).map((card) => (
        <Link to={`/itemflashcard/${card._id}`} key={card._id}>
          <div className="recent flex">
            <div className="recent-icon">
              <i className="fa-solid fa-address-card"></i>
            </div>
            <div className="recent-content">
              <p>{card.title || "Untitled"}</p>
              <p>
                Flashcard set • {card.metadata?.views ?? 0} terms • by{" "}
                {card.creator?.username || "Unknown"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
