import { Link } from "react-router-dom";
import account from "../../../../assets/img/account.jpg";
import { flashCardApi } from "../../../../api/flashCardApi";
import { useEffect, useState } from "react";

export default function SectionPopularItem() {
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
      {flashCards.map((card) => (
        <Link to={`/itemflashcard/${card._id}`} key={card._id}>
          <div className="session all-section">
            <h1>{card.title}</h1>
            <div className="session-terms">
              {/* Nếu views nằm trong metadata */}
              <p>{card.metadata.views} term</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="author" />
              <p>{card.creator.username}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
