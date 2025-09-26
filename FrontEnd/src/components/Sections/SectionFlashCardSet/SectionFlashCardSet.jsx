import account from "../../../assets/img/account.jpg";
import { Link, useParams } from "react-router-dom";
import { flashCardApi } from "../../../api/flashCardApi";
import { useEffect, useState } from "react";
import { getUser } from "../../../other/storage";

export default function SectionFlashCardSet() {
  const [flashCards, setFlashCards] = useState([]);

  const { id } = useParams();
  console.log("id", id);
  const user = getUser();
  console.log(user.id);
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
        .filter(
          (card) =>
            card.delete_flashcard === false &&
            String(card.creator.user_id) === String(id || user.id)
        )
        .slice()
        .reverse()
        .map((card) => (
          <section className="sectionflashcardset" key={card._id}>
            <div className="header-flashcash flex">
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
                    <p>
                      {String(card.creator.user_id) === String(user.id)
                        ? "You"
                        : card.creator.username}
                    </p>
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
