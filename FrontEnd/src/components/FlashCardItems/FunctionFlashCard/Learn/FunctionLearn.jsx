import "./CssFunctionLearn.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { flashCardApi } from "../../../../api/flashCardApi";

export default function FunctionLearn({ isPadded }) {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [currentFlashcards, setCurrentFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [studied, setStudied] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm shuffle
  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  // Sinh options cho toàn bộ flashcards
  function generateCards(content) {
    const allBacks = content.map((c) => c.back);
    return content.map((c) => {
      const wrongs = shuffle(allBacks.filter((b) => b !== c.back)).slice(0, 3);
      return {
        term: c.front,
        definition: c.back,
        options: shuffle([...wrongs, c.back]),
      };
    });
  }

  // Fetch flashcards từ API
  useEffect(() => {
    flashCardApi
      .getById(id)
      .then((data) => {
        setFlashcard(data);
        if (data?.content?.length > 0) {
          const cardsWithOptions = generateCards(data.content);
          setCurrentFlashcards(cardsWithOptions);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  //Cập nhật state lên location
  useEffect(() => {
    navigate(location.pathname, { state: { isFinished } });
  }, [isFinished, navigate, location.pathname]);

  const totalCards = currentFlashcards.length;

  const handleAnswer = (optionIndex) => {
    if (showContinue) return;

    const currentCard = currentFlashcards[currentIndex];
    const selectedOption =
      optionIndex === -1 ? null : currentCard.options[optionIndex];
    const isCorrect = selectedOption === currentCard.definition;

    setSelectedOption(optionIndex);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setStudied((prev) => [
        ...prev,
        {
          term: currentCard.term,
          definition: currentCard.definition,
          isCorrect,
        },
      ]);

      // Auto-advance if correct
      if (currentIndex < totalCards - 1) {
        setTimeout(() => {
          setCurrentIndex((i) => i + 1);
          setSelectedOption(null);
        }, 500);
      } else {
        setIsFinished(true);
      }
    } else {
      setWrongCount((w) => w + 1);
      setShowContinue(true);
      setStudied((prev) => [
        ...prev,
        {
          term: currentCard.term,
          definition: currentCard.definition,
          isCorrect,
        },
      ]);
    }
  };

  const handleContinue = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowContinue(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleClose = () => {
    navigate(`/itemflashcard/${id}`);
  };

  const reset = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setStudied([]);
    setIsFinished(false);
    setSelectedOption(null);
    setShowContinue(false);
  };

  useEffect(() => {
    if (isFinished) {
      const handleKeyDown = () => {
        reset();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isFinished]);

  const progressPercent = totalCards ? (correctCount / totalCards) * 100 : 0;

  // Nếu chưa có dữ liệu thì show loading
  if (!currentFlashcards.length) {
    return <div>Loading...</div>;
  }

  // Khi học xong tất cả
  if (isFinished) {
    return (
      <div
        className="function-learn"
        style={{ paddingLeft: isPadded ? "200px" : "0px" }}
      >
        <button className="btnClose" onClick={handleClose}>
          <i className="fa fa-times"></i>
        </button>
        <div className="function-learn-stats-main-content">
          <h2>Keep up the good work!</h2>
          <span className="progress-title">
            Total set progress:
            <span className="progress-title-percent">
              {progressPercent.toFixed(0)}%
            </span>
          </span>
          <div className="progress-container">
            <span>{correctCount}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span>{totalCards}</span>
          </div>
          <div className="labels">
            <span>Correct</span>
            <span>Total questions</span>
          </div>
          <div className="terms-studied">
            <h3>Terms studied in this round</h3>
            {studied.map((s, idx) => (
              <div key={idx} className="term-item">
                <span className="term">{s.term}</span>
                <span className="separator">|</span>
                <span className="definition">{s.definition}</span>
              </div>
            ))}
          </div>
          <div className="continue-section">
            <span>Press any key to continue</span>
            <button className="continue-btn" onClick={reset}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = currentFlashcards[currentIndex];
  const correctIndex = currentCard.options.findIndex(
    (opt) => opt === currentCard.definition
  );

  return (
    <div
      className="function-learn"
      style={{ paddingLeft: isPadded ? "200px" : "0px" }}
    >
      <div className="function-learn-main-content">
        <div className="progress-container">
          <span>{correctCount}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span>{totalCards}</span>
        </div>

        <div className="itemflashcard-main">
          <div className="mode-learn-main-content">
            <div className="term-section">
              <span className="term-label">Term</span>
              <div className="term-text">{currentCard.term}</div>
            </div>
            <div className="answer-section">
              <span className="answer-label">Choose an answer</span>
              <div className="answer-options">
                {currentCard.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option ${
                      selectedOption !== null && i === correctIndex
                        ? "correct"
                        : selectedOption === i
                        ? "wrong"
                        : ""
                    }`}
                    onClick={() => handleAnswer(i)}
                    disabled={showContinue}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="btn-dont-know">
              <button
                className="dontKnow"
                onClick={() => handleAnswer(-1)}
                disabled={showContinue}
              >
                Don't know?
              </button>
              {showContinue && (
                <button className="continue-btn" onClick={handleContinue}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
