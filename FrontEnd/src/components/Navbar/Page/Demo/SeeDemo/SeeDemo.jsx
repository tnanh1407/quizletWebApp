import { Link, Outlet } from "react-router-dom";
import Footer from "../../../../Footer/Footer.jsx";
import ItemsSeeDemo from "./Items/ItemsSeeDemo.jsx";
import { useState } from "react";

export default function SeeDemo({ isPadded }) {
  const [isDemoSetting, setIsDemoSetting] = useState(false);

  const toggleDemoSetting = () => {
    setIsDemoSetting(!isDemoSetting);
  };

  const [isRecentOption, setIsRecentOption] = useState(false);

  const toggleRecentOption = () => {
    setIsRecentOption(!isRecentOption);
  };

  const [isAddTag2, setIsAddTag2] = useState(false);

  const toggleAddTag2 = () => {
    setIsAddTag2(!isAddTag2);
    setIsAddOrRemoveTags(!isAddOrRemoveTags);
  };

  const [isAddTag, setIsAddTag] = useState(false);

  const toggleAddTag = () => {
    setIsAddTag(!isAddTag);
  };

  const [isAddOrRemoveTags, setIsAddOrRemoveTags] = useState(false);

  const toggleAddOrRemoveTags = () => {
    setIsAddOrRemoveTags(!isAddOrRemoveTags);
  };
  return (
    <>
      <div
        id="new-folder-add-tag"
        className={isAddTag || isAddTag2 ? "block" : "hidden"}
      >
        <div className="new-folder-add-tag-container">
          <button className="new-folder-add-tag-close" onClick={toggleAddTag}>
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div className="new-folder-add-tag-header">
            <h1>New tag</h1>
            <div className="new-folder-recommended">
              <input type="text" placeholder="Tag name" />
              <p>Recommended</p>
              <div className="new-folder-recommended-main">
                <button>
                  <p>Exam 1</p>
                </button>
                <button>
                  <p>Exam 2</p>
                </button>
                <button>
                  <p>Midterm</p>
                </button>
                <button>
                  <p>Final exam</p>
                </button>
                <button>
                  <p>Quiz 1</p>
                </button>
                <button>
                  <p>Unit 1</p>
                </button>
              </div>
            </div>
          </div>
          <div className="new-folder-add-tag-footer">
            <button>
              <p>Add</p>
            </button>
          </div>
        </div>
      </div>
      <div
        id="add-or-remove-tags"
        className={isAddOrRemoveTags ? "block" : "hidden"}
      >
        <div className="add-or-remove-tags-container padding-32-32-0">
          <button
            className="new-folder-add-tag-close"
            onClick={toggleAddOrRemoveTags}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div className="add-or-remove-tags-container-content">
            <h1>Add or remove tags</h1>
            <div className="add-or-remove-tags-container-main flex">
              <button className="flex">
                <i class="fa-regular fa-circle"></i>
                <p>demo2</p>
              </button>
              <button onClick={toggleAddTag2}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <button className="button-add-or-remove-tags-done">
              <p>Done</p>
            </button>
          </div>
        </div>
      </div>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "20px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="main-content-new-folder">
              <div className="new-folder-header flex">
                <h1>SeeDemo</h1>
                <div className="study-other flex">
                  <Link to="/" className="stydy-other-a">
                    <p>Study</p>
                  </Link>
                  <button
                    className="other-new-folder"
                    onClick={toggleDemoSetting}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                  <div
                    id="new-folder-setting"
                    className={isDemoSetting ? "block" : "hidden"}
                  >
                    <button className="flex">
                      <i class="fa-solid fa-tag"></i>
                      <p>Add tag</p>
                    </button>
                    <button className="flex">
                      <i class="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </button>
                    <button className="flex">
                      <i class="fa-solid fa-arrow-up-from-bracket"></i>
                      <p>Share</p>
                    </button>
                    <button className="flex">
                      <i class="fa-solid fa-thumbtack-slash"></i>
                      <p>Unpin from sidebar</p>
                    </button>
                    <button className="flex setting-delete">
                      <i class="fa-solid fa-trash"></i>
                      <p>Delete</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="new-folder-main">
                <div className="new-folder-main-filter">
                  <button className="filter-add">
                    <p>All</p>
                  </button>
                  <button
                    className="new-folder-filter-add"
                    onClick={toggleAddTag}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="see-folder-maincontent flex">
                  <button
                    className="see-folder-button-recent"
                    onClick={toggleRecentOption}
                  >
                    <div className="see-folder-button-recent-main flex">
                      <p>Recent</p>
                      <i class="fa-solid fa-arrows-up-down"></i>
                    </div>
                  </button>
                  <div
                    id="see-folder-recent-main"
                    className={isRecentOption ? "block" : "hidden"}
                  >
                    <button className="flex">
                      <p>Recent</p>
                    </button>
                    <button className="flex">
                      <p>Title</p>
                    </button>
                  </div>
                  <div className="see-folder-filter flex">
                    <button className="see-folder-button-material flex">
                      <div className="see-folder-button-material-main flex">
                        <i class="fa-solid fa-plus"></i>
                        <p>Material</p>
                      </div>
                    </button>
                    <div className="see-folder-search">
                      <input type="text" placeholder="Search this folder" />
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                </div>
                <div className="see-folder-main-items">
                  <ItemsSeeDemo onToggle={toggleAddOrRemoveTags} />
                  <ItemsSeeDemo onToggle={toggleAddOrRemoveTags} />
                  <ItemsSeeDemo onToggle={toggleAddOrRemoveTags} />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
