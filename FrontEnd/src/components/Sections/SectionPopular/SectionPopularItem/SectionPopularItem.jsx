import { Link } from "react-router-dom";
import account from "../../../../assets/img/account.jpg";
import { flashCardApi } from "../../../../api/flashCardApi";
import { useEffect, useState } from "react";
import { getUser } from "../../../../other/storage";
import { classroomApi } from "../../../../api/classroomApi";

export default function SectionPopularItem() {
  const [flashCards, setFlashCards] = useState([]);

  const user = getUser();
  useEffect(() => {
    const fetchData = async () => {
      const data = await classroomApi.getAll();
      setFlashCards(data);
    };

    fetchData();
  }, []);
  return (
    <>
      {flashCards
        .filter((card) => card.delete_classroom === false)
        .slice(0, 9)
        .map((card) => (
          <Link to={`/class/${card._id}/material`} key={card._id}>
            <div className="session all-section">
              <h1>{card.title}</h1>
              <div className="session-terms">
                {/* Nếu views nằm trong metadata */}
                <p>{card.content_count} term</p>
              </div>
              <div className="session-author flex">
                <img src={account} alt="author" />
                <p>
                  {String(card.creator.user_id) === String(user.id)
                    ? "You"
                    : card.creator.username}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}
