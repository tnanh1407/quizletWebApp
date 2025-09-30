import "./HeaderFunction.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { flashCardApi } from "../../../../api/flashCardApi";

export default function HeaderFunction() {
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState();
  const [previousMode, setPreviousMode] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [flashcard, setFlashcard] = useState({});
  const location = useLocation();

  useEffect(() => {
    flashCardApi
      .getById(id)
      .then((data) => {
        setFlashcard(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const modes = [
    { name: "Flashcards", icon: "fa fa-clone", path: `/${id}/flashcards` },
    { name: "Learn", icon: "fa-solid fa-spinner", path: `/${id}/learn` },
    { name: "Test", icon: "fa-regular fa-file-lines", path: `/${id}/test` },
    /*{ name: "Blocks", icon: "fa-solid fa-table-cells-large", path: null },
    { name: "Blast", icon: "fa fa-rocket", path: null },
    { name: "Match", icon: "fa-brands fa-connectdevelop", path: null },*/
    { name: "Home", icon: null, path: "/" },
    { name: "Search", icon: null, path: "/search/allresults" },
  ];

  const availableModes = modes.filter((mode) => mode.name !== selectedMode);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentMode = modes.find((mode) => {
      if (mode.path) {
        const basePath = currentPath.split("/")[1];
        return (
          currentPath === `/${basePath}${mode.path}` ||
          currentPath === mode.path.replace(":id", basePath)
        );
      }
      return false;
    });
    if (currentMode) {
      setPreviousMode(selectedMode);
      setSelectedMode(currentMode.name);
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectMode = (mode, path) => {
    if (mode !== selectedMode) {
      setPreviousMode(selectedMode);
      setSelectedMode(mode);
      setIsDropdownOpen(false);
      if (path) {
        navigate(path);
      }
    }
  };

  const handleTurnToQuestions = () => {
    if (selectedMode === "Flashcards") {
      const basePath = location.pathname.split("/")[1];
      navigate(`/${basePath}/learn`);
    }
  };

  const handleClose = () => {
    const basePath = location.pathname.split("/")[1];
    navigate(`/itemflashcard/${basePath}`);
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
            <div className="data-olay-container">
              <button
                className="btn-mode"
                onClick={toggleDropdown}
                ref={dropdownRef}
              >
                {modes.find((m) => m.name === selectedMode)?.icon && (
                  <i
                    class={modes.find((m) => m.name === selectedMode).icon}
                    style={{ fontSize: "20px", color: "#4b6aff" }}
                  ></i>
                )}
                <span>{selectedMode}</span>
                <i class="fa fa-chevron-down"></i>
                {isDropdownOpen && (
                  <ul className="mode-dropdown">
                    {availableModes.map((mode, index) => (
                      <li
                        key={index}
                        className={`mode-item ${
                          selectedMode === mode.name ? "active" : ""
                        }`}
                        onClick={() =>
                          selectMode(mode.name, mode.path, mode.icon)
                        }
                      >
                        {mode.icon && (
                          <i
                            className={mode.icon}
                            style={{
                              marginRight: "20px",
                              fontSize: "16px",
                              color: "#4b6aff",
                            }}
                          ></i>
                        )}
                        {mode.name}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            </div>
          </div>
          <div className="column-center">
            {/* {(selectedMode === "Flashcards" || selectedMode === "Test" ) && (
              <> */}
            {/* <span>1 /22</span> */}
            <h2>{flashcard.title || "..."}</h2>
            {/* </>
            )} */}
          </div>
          <div className="column-right">
            {selectedMode === "Flashcards" && (
              <button
                className="btn-turn-questions"
                onClick={handleTurnToQuestions}
              >
                <i
                  class="fa-solid fa-spinner"
                  style={{ color: "#4b6aff", marginRight: "5px" }}
                ></i>
                Turn these into questions
              </button>
            )}
            {/*<button className="btn-turn-questions">
              <i class="fa-solid fa-spinner" style={{color: "#4b6aff", marginRight:"5px"}}></i>
              Turn these into questions
            </button>*/}
            <button className="btn-settings">
              <i class="fa fa-cog" aria-hidden="true"></i>
            </button>
            <button className="btn-close" onClick={handleClose}>
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div className="main-content"></div>
      </div>
    </>
  );
}
