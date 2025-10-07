import "./CssFunctionFlashCard.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flashCardApi } from "../../../../api/flashCardApi";

export default function FunctionFlashCard({ isPadded }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flashcard, setFlashcard] = useState(null);
  const [currentFlashcards, setCurrentFlashcards] = useState([]);

  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [stillLearning, setStillLearning] = useState(0);
  const [know, setKnow] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [learningCards, setLearningCards] = useState([]);

  const [lastCardIndex, setLastCardIndex] = useState(null);
  const [lastFlipped, setLastFlipped] = useState(false);

  // const [flipped, setFlipped] = useState(false);
  // const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState("next");

  // Fetch flashcards từ API
  useEffect(() => {
    flashCardApi
      .getById(id)
      .then((data) => {
        setFlashcard(data);
        if (data?.content?.length > 0) {
          setCurrentFlashcards(data.content);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Lắng nghe phím bất kỳ để chuyển sang learn sau khi completed
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isCompleted && event.key) {
        navigate(`/${id}/learn`);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isCompleted, navigate, id]);

  // --- Handlers ---
  const handleFlip = () => setFlipped(!flipped);

  const handleMark = (type) => {
    if (type === "stillLearning") {
      setStillLearning((prev) => prev + 1);
      setLearningCards((prev) => [...prev, index]);
    } else if (type === "know") {
      setKnow((prev) => prev + 1);
    }

    if (index + 1 < currentFlashcards.length) {
      setLastCardIndex(index);
      setLastFlipped(flipped);
      setIndex((prev) => prev + 1);
      setFlipped(false);
    } else {
      setIsCompleted(true);
      setLastCardIndex(index);
      setLastFlipped(flipped);
    }
  };

  const reset = () => {
    setCurrentFlashcards(flashcard?.content || []);
    setIndex(0);
    setFlipped(false);
    setStillLearning(0);
    setKnow(0);
    setIsCompleted(false);
    setLearningCards([]);
  };

  const handlePractice = () => navigate(`/${id}/learn`);

  const goBackToLastQuestion = () => {
    // if (lastCardIndex !== null) {
    //   setIsCompleted(false);
    //   setIndex(lastCardIndex);
    //   setFlipped(lastFlipped);
    // }
    reset();
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

  // --- Render ---
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

  if (currentFlashcards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div
      className="main-flex"
      style={{ paddingLeft: isPadded ? "200px" : "0px" }}
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
            </div>
          </div>

          <div className="function-flashcard-main-content-option flex">
            <h1></h1>
            <div className="function-flashcard-main-content-option-move flex">
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
              {/* <button>
                <i className="fa-solid fa-play"></i>
              </button>
              <button>
                <i className="fa-solid fa-shuffle"></i>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
