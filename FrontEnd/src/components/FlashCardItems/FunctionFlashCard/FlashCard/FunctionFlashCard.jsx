import "./CssFunctionFlashCard.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FunctionFlashCard({ isPadded }) {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [stillLearning, setStillLearning] = useState(0);
  const [know, setKnow] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [learningCards, setLearningCards] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  //Cập nhật state lên location
  useEffect(() => {
    navigate(location.pathname, { state: { isCompleted } });
  }, [isCompleted, navigate, location.pathname]);

  //Lưu trữ trạng thái của thẻ cuối cùng
  const [lastCardIndex, setLastCardIndex] = useState(null);
  const [lastFlipped, setLastFlipped] = useState(false);

  const flashcards = [
    { term: "Demo", definition: "Thử nghiệm" },
    { term: "Test", definition: "Kiểm tra" },
    { term: "Learn", definition: "Học" },
    { term: "Study", definition: "Nghiên cứu" },
  ];

  const [currentFlashcards, setCurrentFlashcards] = useState(flashcards);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleMark = (type) => {
    if (type === "stillLearning") {
      setStillLearning((prev) => prev + 1);
      setLearningCards((prev) => [...prev, index]);
    } else if (type === "know") {
      setKnow((prev) => prev + 1);
    }
    // Lưu trạng thái của thẻ cuối cùng trước khi chuyển
    if (index + 1 < flashcards.length) {
      setLastCardIndex(index);
      setLastFlipped(flipped);
      setIndex((prev) => prev + 1);
      setFlipped(false);
    } else {
      setIsCompleted(true);
      setLastCardIndex(index); // Lưu thẻ cuối cùng khi hoàn thành
      setLastFlipped(flipped);
    }

    // Chuyển sang thẻ tiếp theo nếu còn thẻ
    {
      /*if (index + 1 < flashcards.length) {
      setIndex((prev) => prev + 1);
      setFlipped(false); // Đặt lại trạng thái lật khi chuyển thẻ
    } else {
      {/*alert("Đã hoàn thành tất cả các thẻ!");
      setIsCompleted(true);
    }*/
    }
  };

  const reset = () => {
    setCurrentFlashcards(flashcards);
    setIndex(0);
    setFlipped(false);
    setStillLearning(0);
    setKnow(0);
    setIsCompleted(false);
    setLearningCards([]);
  };

  const handlePractice = () => {
    navigate("/:id/learn"); // Điều hướng đến trang /learn
  };

  const goBackToLastQuestion = () => {
    if (lastCardIndex !== null) {
      setIsCompleted(false);
      setIndex(lastCardIndex);
      setFlipped(lastFlipped);
    }
  };

  const focusOnStillLearning = () => {
    if (learningCards.length > 0) {
      const filtered = learningCards.map((i) => currentFlashcards[i]);

      if (filtered.length === 0) {
        setIsCompleted(true);
        return;
      }

      setCurrentFlashcards(filtered);
      setIndex(0);
      setFlipped(false);
      setKnow(0);
      setStillLearning(0);
      setIsCompleted(false);
      setLearningCards([]);
    } else {
      setIsCompleted(true);
    }
  };

  if (
    !isCompleted &&
    (currentFlashcards.length === 0 || index >= currentFlashcards.length)
  ) {
    setIsCompleted(true);
    return null;
  }

  // Lắng nghe phím bất kỳ để điều hướng đến /learn khi hoàn thành
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isCompleted && event.key) {
        navigate("/:id/learn");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isCompleted, navigate]);

  if (isCompleted) {
    const total = know + stillLearning;
    const knowPercentage = total > 0 ? Math.round((know / total) * 100) : 0;

    return (
      <div className="stats-page">
        <div className="stats-header">
          <h1>Amazing! You're almost there.</h1>
          <span className="confetti">🎉</span>
        </div>
        <div className="stats-content">
          <div className="how-doing">
            <h2>How you're doing</h2>
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(#00c27f ${knowPercentage}%, #f28c38 ${knowPercentage}% ${
                  knowPercentage + (stillLearning / total) * 100
                }%, #2e3856 ${
                  knowPercentage + (stillLearning / total) * 100
                }% 100%)`,
              }}
            >
              <div className="circle-inner">
                <span>{knowPercentage}%</span>
              </div>
            </div>
            <div className="progress-bars">
              <div className="bar know-bar">
                <span>Know</span>
                <span>{know}</span>
              </div>
              <div className="bar still-learning-bar">
                <span>Still learning</span>
                <span>{stillLearning}</span>
              </div>
              <div className="bar remaining-bar">
                <span>Terms remaining</span>
                <span>0</span>
              </div>
            </div>
          </div>
          <div className="next-steps">
            <h2>Next steps</h2>
            <button className="practice-btn" onClick={handlePractice}>
              Practice with questions
            </button>
            <button className="focus-btn" onClick={focusOnStillLearning}>
              Focus on {stillLearning} Still learning cards
            </button>
            <button className="reset-btn" onClick={reset}>
              Reset Flashcards
            </button>
          </div>
        </div>
        <div className="stats-footer">
          <span className="back-link" onClick={goBackToLastQuestion}>
            &lt; Back to the last question
          </span>
          <span className="continue-text" onClick={handlePractice}>
            Press any key to continue &gt;
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="main-flex"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      <div className="function-flashcard-maincontent">
        <div className="function-flashcard-content">
          <div className="itemflashcard-main">
            <div className="function-flashcard-main">
              <div className="progress-tracker">
                <span className="still-learning">
                  <span className="count">{stillLearning}</span> Still learning
                </span>
                <span className="know">
                  <span className="count">{know}</span> Know
                </span>
              </div>
              <div className="function-flashcard-main-content">
                <div className="function-flashcard-main-content-header flex">
                  <div className="function-flashcard-main-content-header-hint flex">
                    <i className="fa-solid fa-lightbulb"></i>
                    <p>Get a hint</p>
                  </div>
                  {/*<i class="fa-regular fa-star"></i>*/}
                </div>
                <div
                  className={`function-flashcard-container ${flipped ? "flipped" : ""}`}
                  onClick={handleFlip}
                >
                  {/*<div className="flashcard-inner"></div>*/}
                  <div className="function-flashcard-side front">
                    <div className="function-flashcard-main-content-contruction">
                      <h1>{flashcards[index].term}</h1>
                    </div>
                  </div>
                  <div className="function-flashcard-side back">
                    <div className="function-flashcard-main-content-contruction">
                      <h1>{flashcards[index].definition}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="function-flashcard-main-content-option flex">
            <h1>Track progress</h1>
            <div className="function-flashcard-main-content-option-move flex">
              {/*<button style={{marginRight:"22px"}}>
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                
                <button>
                  <i class="fa-solid fa-arrow-right"></i>
                </button> */}
              <button
                style={{ marginRight: "22px", color: "#f28c38" }}
                onClick={() => handleMark("stillLearning")}
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <button
                style={{ color: "#00c27f" }}
                onClick={() => handleMark("know")}
              >
                <i className="fa-solid fa-check"></i>
              </button>
            </div>
            <div className="function-flashcard-main-content-option-option">
              <button>
                <i className="fa-solid fa-play"></i>
              </button>
              <button>
                <i className="fa-solid fa-shuffle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
