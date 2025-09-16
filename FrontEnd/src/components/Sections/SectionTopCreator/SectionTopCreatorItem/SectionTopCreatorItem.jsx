import { Link } from "react-router-dom";
import account from "../../../../assets/img/account.jpg";
import { useState, useEffect } from "react";
import { userApi } from "../../../../api/userApi.js";

export default function SectionTopCreatorItem() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await userApi.getAll();
      setUsers(data);
    };

    fetchData();
  }, []);
  return (
    <>
      {users.map((user) => (
        <Link to={`/users/${user._id}`} key={user._id}>
          <div className="session all-section">
            <img src={account} alt="" />
            <div className="creator-in4">
              <div className="creator-rule flex">
                <h3>{user.username}</h3>
                <div className="creator-rule-important">
                  <p>Teacher</p>
                </div>
              </div>
              <div className="creator-tag flex">
                <div className="flex khung-mo-ta">
                  <i className="fa-solid fa-thumbs-up"></i>
                  <p>flashcard sets</p>
                </div>
                <div className="flex khung-mo-ta">
                  <i className="fa-solid fa-thumbs-up"></i>
                  <p>0 class</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
