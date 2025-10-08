import SectionFolder from "../../../../../Sections/SectionFolder.jsx";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CssFolders.css";
import { folderApi } from "../../../../../../api/folderApi.js";
import { getUser } from "../../../../../../other/storage.js";

export default function YourFolders() {
  const { id } = useParams();
  const [isFilterFolders, setIsFilterFolders] = useState(false);
  const [folders, setFolders] = useState([]);
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await folderApi.getAll();
      setFolders(data);
    };

    fetchData();
  }, []);

  const toggleFilterFolders = () => {
    setIsFilterFolders(!isFilterFolders);
  };

  return (
    <>
      <div className="flashcardsearch">
        {String(id || user.id) === String(user.id) ? (
          <div className="flashcard-option">
            <button className="flex" onClick={toggleFilterFolders}>
              <p>Created</p>
              <i className="fa-solid fa-magnifying-glass"></i>
              <div className={`folder ${isFilterFolders ? "block" : "hidden"}`}>
                <div className="folder-option">
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Created</p>
                    </div>
                  </Link>
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Bookmarked</p>
                    </div>
                  </Link>
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Recent</p>
                    </div>
                  </Link>
                  <Link href="">
                    <div className="setting-item flex">
                      <p>Studied</p>
                    </div>
                  </Link>
                </div>
              </div>
            </button>
          </div>
        ) : null}
      </div>
      {folders
        .filter(
          (folder) =>
            folder.delete_folder === false &&
            String(folder.creator.user_id) === String(id || user.id)
        )
        .map((folder) => (
          <section className="sectionfolder">
            <Link to={`/folder/${folder._id}`}>
              <div className="main-flashcard">
                <div className="flashcard-creator flex">
                  <p>{folder.flashcard_count} terms</p>
                </div>
                <div className="nameflashcard flex">
                  <i class="fa-regular fa-folder"></i>
                  <h1>{folder.title}</h1>
                </div>
              </div>
            </Link>
          </section>
        ))}
    </>
  );
}
