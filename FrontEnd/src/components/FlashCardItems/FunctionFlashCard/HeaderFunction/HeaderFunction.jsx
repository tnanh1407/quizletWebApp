import "./HeaderFunction.css";
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function HeaderFunction() {
  const { id } = useParams();
  console.log(id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Flashcards");
  const dropdownRef = useRef(null);

  const modes = [
    // { name: " FlashCards", icon: "fa fa-clone", path: `/${id}/flashcards` },
    { name: "Learn", icon: "fa-solid fa-spinner", path: `/${id}/learn` },
    { name: "Test", icon: "fa-regular fa-file-lines", path: `/${id}/learn` },
    { name: "Home", icon: null, path: `/` },
    { name: "Search", icon: null, path: `/` },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectMode = (mode) => {
    setSelectedMode(mode);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className="header-container">
        <div className="head-content">
          <div className="column-left">
            {isDropdownOpen && (
              <div
                id="account-setting"
                className="option-function"
                ref={dropdownRef}
              >
                <div className="account-setting option-container">
                  <Link to={`/${id}/flashcards`}>
                    <div className="setting-item flex">
                      <i className="fa-solid fa-clone"></i>
                      <p>Flashcards</p>
                    </div>
                  </Link>

                  <Link to={`/${id}/learn`}>
                    <div className="setting-item flex">
                      <i className="fa-solid fa-spinner"></i>
                      <p>Learn</p>
                    </div>
                  </Link>
                  <Link to={`/${id}/test`}>
                    <div className="setting-item flex">
                      <i className="fa-solid fa-file-lines"></i>
                      <p>Test</p>
                    </div>
                  </Link>
                </div>
                <div className="account-setting last option-container">
                  <Link to="/">
                    <div className="setting-item flex">
                      <p>Home</p>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="setting-item flex">
                      <p>Search</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            <div className="data-olay-container">
              <button
                className="btn-mode"
                onClick={toggleDropdown}
                ref={dropdownRef}
              >
                <i
                  class="fa fa-clone"
                  style={{ fontSize: "16px", color: "#4b6aff" }}
                ></i>
                <span>{selectedMode}</span>
                <i class="fa fa-chevron-down"></i>
              </button>
            </div>
          </div>
          <div className="column-center">
            <span>1 / 22</span>
            <h2>Demo 1</h2>
          </div>
          <div className="column-right">
            <button className="btn-turn-questions">
              <i
                class="fa-solid fa-spinner"
                style={{ color: "#4b6aff", marginRight: "5px" }}
              ></i>
              Turn these into questions
            </button>
            <button className="btn-settings">
              <i class="fa fa-cog" aria-hidden="true"></i>
            </button>
            <Link to={`/itemflashcard/${id}`} className="btn-close">
              <i class="fa fa-times" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
