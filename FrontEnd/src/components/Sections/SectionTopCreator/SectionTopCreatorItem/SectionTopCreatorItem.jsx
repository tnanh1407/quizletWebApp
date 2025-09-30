import { Link } from "react-router-dom";
import account from "../../../../assets/img/account.jpg";
import { useState, useEffect } from "react";
import { userApi } from "../../../../api/userApi.js";
import { getUser } from "../../../../other/storage.js";

// icon
import { TbCards } from "react-icons/tb";
import { MdOutlineGroup } from "react-icons/md";

export default function SectionTopCreatorItem() {
  const [users, setUsers] = useState([]);

  const userId = getUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userApi.getAllPublic();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {users.map((user) => (
        <Link
          to={
            String(user._id) === String(userId.id)
              ? "/your-library/flashcards"
              : `/creator/${user._id}/flashcards`
          }
          key={user._id}
        >
          <div className="session all-section">
            <img src={account} alt="" />
            <div className="creator-in4">
              <div className="creator-rule flex">
                <h3>
                  {String(user._id) === String(userId.id)
                    ? "You"
                    : user.username}
                </h3>
                <div className="creator-rule-important">
                  <p>Teacher</p>
                </div>
              </div>
              <div className="creator-tag flex">
                <div className="flex khung-mo-ta">
                  <TbCards className="icon-top-creator" />
                  <p> {user.stats.flashcards} flashcard sets</p>
                </div>
                <div className="flex khung-mo-ta">
                  <MdOutlineGroup className="icon-top-creator" />
                  <p>{user.stats.classes} class</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
