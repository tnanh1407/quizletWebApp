import account from "../../../assets/img/account.jpg";
import { Link } from "react-router-dom";
import { flashCardApi } from "../../../api/flashCardApi";
import { useEffect, useState } from "react";

export default function SectionFlashCardSet() {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await flashCardApi.getAll();
      setFlashCards(data);
    };

    fetchData();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long" });
  };
  return (
    <>
      {flashCards
        .slice()
        .reverse()
        .map((card) => (
          <section className="sectionflashcardset">
            <div className="header-flashcash flex" key={card._id}>
              <p>{formatDate(card.createAt)}</p>
              <div className="header-line"></div>
            </div>
            <Link to={`/itemflashcard/${card._id}`}>
              <div className="main-flashcard">
                <div className="flashcard-creator flex">
                  <p>{card.content_count} term</p>
                  <span className="span"></span>
                  <div className="creator-in4 flex">
                    <img src={account} alt="" />
                    <p>{card.creator.username}</p>
                  </div>
                </div>
                <div className="nameflashcard">
                  <h1>{card.title}</h1>
                </div>
              </div>
            </Link>
          </section>
        ))}
    </>
  );
}
