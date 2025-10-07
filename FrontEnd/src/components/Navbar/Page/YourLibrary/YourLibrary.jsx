import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../../Footer/Footer.jsx";
import "./CssYourLibrary.css";
import { getUser } from "../../../../other/storage.js";
import imgCreator from "../../../../assets/img/account.jpg";
import { userApi } from "../../../../api/userApi.js";

export default function YourLibrary() {
  const { id } = useParams();
  const user = getUser();
  const location = useLocation();
  const [creator, setCreator] = useState(null);

  const isActive = (path) => {
    return location.pathname === path ? "active-items" : "";
  };

  useEffect(() => {
    if (id && String(id) !== String(user.id)) {
      userApi
        .getByIdPublic(id)
        .then((res) => {
          console.log("API getByIdPublic:", res);
          setCreator(res);
        })
        .catch((err) => console.error("Error fetch public user:", err));
    } else {
      setCreator(user);
    }
  }, [id]);
  return (
    <>
      <div className="main-content-library">
        {String(id || user.id) === String(user.id) ? (
          <h1>Your library</h1>
        ) : (
          <div id="main-content-creator" className="flex">
            <img src={creator?.avatar} alt="" />
            <h2>{creator?.username || "Loading..."}</h2>
          </div>
        )}

        <menu className="main-content-items flex">
          <Link
            to={
              String(id || user.id) === String(user.id)
                ? "/your-library/flashcards"
                : `/creator/${id}/flashcards`
            }
          >
            <div
              className={`items ${isActive(
                String(id || user.id) === String(user.id)
                  ? "/your-library/flashcards"
                  : `/creator/${id}/flashcards`
              )}`}
            >
              <p>Flash Card</p>
            </div>
          </Link>
          <Link
            to={
              String(id || user.id) === String(user.id)
                ? "/your-library/folders"
                : `/creator/${id}/folders`
            }
          >
            <div
              className={`items ${isActive(
                String(id || user.id) === String(user.id)
                  ? "/your-library/folders"
                  : `/creator/${id}/folders`
              )}`}
            >
              <p>Folders</p>
            </div>
          </Link>
          <Link
            to={
              String(id || user.id) === String(user.id)
                ? "/your-library/classes"
                : `/creator/${id}/classes`
            }
          >
            <div
              className={`items ${isActive(
                String(id || user.id) === String(user.id)
                  ? "/your-library/classes"
                  : `/creator/${id}/classes`
              )}`}
            >
              <p>Classes</p>
            </div>
          </Link>
          <Link
            to={
              String(id || user.id) === String(user.id)
                ? "/your-library/test"
                : `/creator/${id}/test`
            }
          >
            <div
              className={`items ${isActive(
                String(id || user.id) === String(user.id)
                  ? "/your-library/test"
                  : `/creator/${id}/test`
              )}`}
            >
              <p>Practice Tests</p>
            </div>
          </Link>
        </menu>
      </div>
      <div className="out-let">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
