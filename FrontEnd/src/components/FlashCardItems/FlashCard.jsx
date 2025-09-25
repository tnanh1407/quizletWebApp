import { useEffect, useState } from "react";
import account from "../../assets/img/account.jpg";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import "./CssFlashCard.css";
import { flashCardApi } from "../../api/flashCardApi";

export default function FlashCard() {
  const { id } = useParams();
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [selected, setSelected] = useState(null); // đáp án đã chọn
  // const [showDefinitions, setShowDefinitions] = useState(true); // có hiển thị nghĩa không
  // const [isLocked, setIsLocked] = useState(false); // khóa không cho chọn lại sau khi đã chọn
  const [flashcard, setFlashcard] = useState(null);
  const location = useLocation();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState("next");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    flashCardApi
      .getById(id)
      .then((data) => setFlashcard(data))
      .catch((err) => console.error(err));

    // let timer;
    // if (location.state?.updated) {
    //   // alert("Cập nhật thành công!");
    // } else if (location.state?.deleted) {
    //   timer = setTimeout(() => setMessage(""), 3000);
    // }
    // return () => clearTimeout(timer);
  }, [id, location.state]);

  const handleDelete = async () => {
    try {
      await flashCardApi.delete(id); // dùng API service
      alert("Deleted successfully");
      navigate(-1, { state: { deleted: true } });
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  if (!flashcard) return <p>Loading...</p>;

  // // chọn đáp án
  // function handleAnswer(option) {
  //   if (isLocked) return; // đã chọn thì không cho chọn thêm
  //   setSelected(option);
  //   setIsLocked(true);
  // }

  // sang câu tiếp theo
  // function changePage(direction) {
  //   if (direction === "next" && currentIndex < questions.length - 1) {
  //     setCurrentIndex((prev) => prev + 1);
  //     setSelected(null);
  //     setIsLocked(false);
  //   } else if (direction === "prev" && currentIndex > 0) {
  //     setCurrentIndex((prev) => prev - 1);
  //     setSelected(null);
  //     setIsLocked(false);
  //   }
  // }

  const changeCard = (dir) => {
    if (
      (dir === "prev" && index === 0) || // đang ở thẻ đầu
      (dir === "next" && index + 1 >= flashcard.content_count) // đang ở thẻ cuối
    ) {
      return; // không cho di chuyển nữa
    }

    setDirection(dir);
    setIsFlipping(true);

    setTimeout(() => {
      setIsFlipping(false);
      setFlipped(false); // reset về mặt trước
      setIndex((prev) => (dir === "next" ? prev + 1 : prev - 1));
    }, 600);
  };

  const handleToggle = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Header */}
      <div className="itemflashcard-header">
        <div className="itemflashcard-header-option flex">
          <div className="itemflashcard-header-option-left">
            <p>Social Science</p>
          </div>
          <div className="itemflashcard-header-option-right flex">
            <>
              {/* Nút Save */}
              <button
                onClick={() => setShowModal(true)}
                className="save-btn-custom"
              >
                <i className="fa-regular fa-bookmark"></i>
                <span>Save</span>
              </button>

              {/* Modal Add to folder */}
              {showModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h2>Add to folder</h2>
                      <button
                        className="close-btn"
                        onClick={() => setShowModal(false)}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="new-folder">
                      <i className="fa-solid fa-plus"></i>
                      <span>New folder</span>
                    </div>

                    <p className="no-folder">You do not yet have any folders</p>

                    <button className="save-btn disabled" disabled>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </>
            <div>
              {/* Nút Share */}
              <button className="share-btn" onClick={handleToggle}>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
              </button>

              {/* Overlay + Modal */}
              {isOpen && (
                <div className="overlay" onClick={handleClose}>
                  <div
                    className="share-modal"
                    onClick={(e) => e.stopPropagation()} // chặn đóng khi bấm bên trong
                  >
                    <div className="modal-header">
                      <h3>Share this set</h3>
                      <button className="close-btn" onClick={handleClose}>
                        ✕
                      </button>
                    </div>

                    <div className="share-content">
                      <input
                        type="text"
                        placeholder="Share link via email"
                        className="share-input"
                      />
                      <button className="btn send">Send email</button>

                      <div className="link-box">
                        <input
                          type="text"
                          value="https://quizlet.com/example-link"
                          readOnly
                        />
                        <button className="btn copy">Copy link</button>
                      </div>

                      <button className="btn fb">Share on Facebook</button>
                      <button className="btn x">Share on X</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="menu-container">
              <button
                className="menu-toggle"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </button>

              {showMenu && (
                <div className="dropdown-menu">
                  <Link to={`/edit-flashcard/${id}`} className="flex">
                    <i className="fa-solid fa-pen"></i>
                    <p>Edit</p>
                  </Link>
                  {/* <p>
                    <i className="fa-solid fa-plus"></i> Add to class
                  </p>
                  <p>
                    <i className="fa-regular fa-copy"></i> Make a copy
                  </p>
                  <p>
                    <i className="fa-solid fa-print"></i> Print
                  </p>
                  <p>
                    <i className="fa-solid fa-object-group"></i> Combine
                  </p>
                  <p>
                    <i className="fa-solid fa-file-export"></i> Export
                  </p>
                  <p>
                    <i className="fa-solid fa-code"></i> Embed
                  </p> */}
                  <button onClick={handleDelete} className="flex delete">
                    <i className="fa-solid fa-trash"></i>
                    <p>Delete</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="itemflashcard-header-title">
          <h1>{flashcard.title}</h1>
          <div className="itemflashcard-header-title-review flex">
            <div className="title-review-study-day flex">
              <i className="fa-regular fa-star"></i>
              <p>10 studiers today</p>
            </div>
            <div className="title-review-growth flex">
              <i className="fa-regular fa-star"></i>
              <p>4.9 (18 reviews)</p>
            </div>
          </div>

          {/* Solutions */}
          <div className="itemflashcard-header-title-solution">
            <Link to={`/${id}/flashcards`} className="flex">
              <div className="title-solution title-solution-flashcard">
                <i class="fa-solid fa-id-card"></i>
                <p>Flashcards</p>
              </div>
            </Link>
            <Link to={`/${id}/learn`} className="flex">
              <div className="title-solution title-solution-learn">
                <i class="fa-solid fa-graduation-cap"></i>
                <p>Learn</p>
              </div>
            </Link>
            <Link to={`/${id}/test`} className="flex">
              <div className="title-solution title-solution-test">
                <i class="fa-solid fa-file-lines"></i>
                <p>Test</p>
              </div>
            </Link>
            {/* <Link to="" className="flex">
              <div className="title-solution title-solution-block">
                <i class="fa-solid fa-table-cells-large"></i>
                <p>Blocks</p>
              </div>
            </Link>
            <Link to="" className="flex">
              <div className="title-solution title-solution-blast">
                <i class="fa-solid fa-rocket"></i>
                <p>Blast</p>
              </div>
            </Link>
            <Link to="" className="flex">
              <div className="title-solution title-solution-match">
                <i class="fa-brands fa-connectdevelop"></i>
                <p>Match</p>
              </div>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="itemflashcard-main">
        {/* Flip toàn bộ thẻ */}
        <div
          className={`flashcard-container ${flipped ? "flipped" : ""} ${
            isFlipping
              ? direction === "next"
                ? "slide-right"
                : "slide-left"
              : ""
          }`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="flashcard-side front">
            {/* Header */}
            <div className="itemflashcard-main-content-header flex">
              <div className="itemflashcard-main-content-header-hint flex">
                <i className="fa-solid fa-lightbulb"></i>
                <p>Get a hint</p>
              </div>
              <i className="fa-regular fa-star"></i>
            </div>
            <div className="itemflashcard-main-content-contruction">
              <h1>{flashcard.content[index].front}</h1>
            </div>
          </div>

          <div className="flashcard-side back">
            <h1>{flashcard.content[index].back}</h1>
          </div>
        </div>

        {/* Options */}
        <div className="itemflashcard-main-content-option flex">
          <h1>Track progress</h1>
          <div className="itemflashcard-main-content-option-move flex">
            <button onClick={() => changeCard("prev")} disabled={index === 0}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <p>
              {index + 1}/{flashcard.content_count}
            </p>
            <button
              onClick={() => changeCard("next")}
              disabled={index + 1 >= flashcard.content_count}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="itemflashcard-main-content-option-option">
            <button>
              <i className="fa-solid fa-play"></i>
            </button>
            <button>
              <i className="fa-solid fa-shuffle"></i>
            </button>
            <button>
              <i className="fa-solid fa-gear"></i>
            </button>
            <Link to={`/${id}/flashcards`}>
              <i className="fa-solid fa-expand"></i>
            </Link>
          </div>
        </div>

        {/* Created by */}
        <div className="itemflashcard-main-created flex">
          <img src={account} alt="avatar" />
          <div className="itemflashcard-main-created-in4">
            <p>Created by</p>
            <h2>thien2805</h2>
          </div>
        </div>
      </div>
      {/* <h2 className="students-title">Students also studied</h2>
      <div className="students-list">
        {sets.map((item, index) => (
          <div key={index} className="student-card">
            <h3 className="student-title">{item.title}</h3>
            <span className="student-terms">{item.terms} terms</span>

            <div className="student-author">
              <img src={item.avatar} alt="avatar" className="student-avatar" />
              <p className="student-username">{item.user}</p>
            </div>

            <button className="student-preview">Preview</button>
          </div>
        ))}
      </div> */}
      {/* <div className="practice-container">
        <h2 className="practice-title">Practice questions for this set</h2>

        <div className="question-card">
          <div className="header">
            <span className="learn-label">Learn</span>
            <span className="progress">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="question-text">{currentQuestion.question}</div>

          {selected && (
            <div
              className={`feedback ${
                selected === currentQuestion.correct
                  ? "correct-text"
                  : "wrong-text"
              }`}
            >
              {selected === currentQuestion.correct
                ? "Brilliant work!"
                : "No problem. You're still learning!"}
            </div>
          )}

          <div className="options">
            {currentQuestion.options.map((opt, idx) => {
              const isCorrect = opt === currentQuestion.correct;
              const isSelected = selected === opt;

              return (
                <button
                  key={idx}
                  className={`option-btn
              ${selected && isCorrect ? "correct" : ""}
              ${selected && isSelected && !isCorrect ? "wrong" : ""}
            `}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                >
                  {selected && isSelected && !isCorrect && <span>❌</span>}
                  {selected && isCorrect && <span>✔️</span>}
                  {opt}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="continue-btn-wrap">
              <button
                className="continue-btn"
                onClick={() => changePage("next")}
                disabled={currentIndex === questions.length - 1}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div> */}

      {/* Terms in this set */}
      {/* <div className="terms-container">
        <h2 className="terms-title">Terms in this set ({questions.length})</h2>

        <div className="terms-list">
          {[
            { term: "name (n)", definition: "tên" },
            { term: "spell (v)", definition: "đánh vần" },
            {
              term: "phone number (n phrase)",
              definition: "số điện thoại",
            },
            { term: "address (n)", definition: "địa chỉ" },
            { term: "nice (adj)", definition: "tốt, vui" },
            { term: "good morning", definition: "chào buổi sáng" },
            { term: "good afternoon", definition: "chào buổi chiều" },
            { term: "hi/hello", definition: "xin chào" },
            { term: "thanks", definition: "cảm ơn" },
          ].map((item, i) => (
            <div key={i} className="term-card">
              <div className="term-left">
                <span className="term-text">{item.term}</span>
              </div>
              <div className="term-right">
                <span className="definition-text">{item.definition}</span>
              </div>
              <div className="term-actions">
                <i className="fa-regular fa-star"></i>
                <i className="fa-solid fa-volume-high"></i>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="controls">
        
        <button
          className="btn-outline"
          onClick={() => setShowDefinitions(!showDefinitions)}
        >
          {showDefinitions ? "Hide definitions" : "Show definitions"}
        </button>

        
        <div className="dropdown">
          <button className="btn-primary">
            Review with an activity <span>▼</span>
          </button>
          <div className="dropdown-content">
            <p>Flashcards</p>
            <p>Learn</p>
            <p>Test</p>
            <p>Match</p>
          </div>
        </div>
      </div> */}
      {/* <div className="bottom-section">
        <div className="columns">
          <div className="col">
            <h4>About us</h4>
            <a href="#">About Quizlet</a>
            <a href="#">Get the app</a>
          </div>
          <div className="col">
            <h4>For Students</h4>
            <a href="#">Flashcards</a>
            <a href="#">Test</a>
            <a href="#">Learn</a>
            <a href="#">Solutions</a>
            <a href="#">Quizlet Plus</a>
          </div>
          <div className="col">
            <h4>For teachers</h4>
            <a href="#">Live</a>
            <a href="#">Blog</a>
            <a href="#">Quizlet Plus for teachers</a>
          </div>
          <div className="col">
            <h4>Resources</h4>
            <a href="#">Help centre</a>
            <a href="#">Honour Code</a>
            <a href="#">Community Guidelines</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">California privacy</a>
            <a href="#">Ad and Cookie Policy</a>
            <a href="#">Interest-Based Advertising</a>
            <a href="#">Quizlet for Schools</a>
            <a href="#">Parents</a>
          </div>
          <div className="col">
            <h4>Language</h4>
            <a href="#">English (UK) ▼</a>
          </div>
        </div>

        <div className="bottom-bar">
          <div className="socials">
            <span>🎵</span>
            <span>🐦</span>
            <span>📘</span>
            <span>📸</span>
            <span>▶️</span>
            <span>💼</span>
          </div>
          <p>© 2025 Quizlet, Inc.</p>
        </div>
      </div> */}
    </>
  );
}
