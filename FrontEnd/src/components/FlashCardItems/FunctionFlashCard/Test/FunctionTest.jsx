import "./CssFunctionTest.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { flashCardApi } from "../../../../api/flashCardApi";

export default function FunctionTest({ isPadded }) {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [currentFlashcards, setCurrentFlashcards] = useState([]);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [questionStates, setQuestionStates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [startTime, setStartTime] = useState(null);

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
        term: c.back,
        definition: c.front,
        options: shuffle([...wrongs, c.front]),
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

  // Đồng bộ questionStates khi currentFlashcards thay đổi
  useEffect(() => {
    if (currentFlashcards.length > 0) {
      setQuestionStates(
        currentFlashcards.map(() => ({
          selectedAnswer: null,
          isSkipped: false,
          isCorrect: false,
        }))
      );
    }
  }, [currentFlashcards]);

  // Cập nhật state lên location
  useEffect(() => {
    navigate(location.pathname, {
      state: { showStats },
    });
  }, [showStats, navigate, location.pathname]);

  // data from Learn
  const questions = currentFlashcards.map((c, idx) => ({
    id: `question-${idx + 1}`,
    definition: c.definition,
    term: c.term,
    options: c.options,
  }));

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const scrollToQuestion = (questionId) => {
    const element = document.getElementById(questionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsNavOpen(false);
  };

  const handleAnswerSelect = (questionIndex, option) => {
    setQuestionStates((prev) =>
      prev.map((state, i) =>
        i === questionIndex
          ? {
              ...state,
              selectedAnswer: option,
              isSkipped: false,
              isCorrect: option === questions[i].definition, // so sánh với đáp án đúng
            }
          : state
      )
    );
  };

  const handleSkipQuestion = (questionIndex) => {
    setQuestionStates((prev) =>
      prev.map((state, i) =>
        i === questionIndex ? { selectedAnswer: null, isSkipped: true } : state
      )
    );
  };

  const handleSubmit = () => {
    const allAnswered = questionStates.every(
      (state) => state.selectedAnswer !== null && !state.isSkipped
    );
    if (!allAnswered) {
      setShowModal(true);
    } else {
      setShowStats(true);
    }
  };

  const handleReviewSkipped = () => {
    setShowModal(false);
    const firstSkippedIndex = questionStates.findIndex(
      (state) => state.isSkipped
    );
    if (firstSkippedIndex !== -1) {
      scrollToQuestion(`question-${firstSkippedIndex + 1}`);
    }
  };

  const handleSubmitNow = () => {
    setShowModal(false);
    setShowStats(true);
  };

  const handleTurnToLearn = () => {
    navigate(`/${id}/learn`);
  };

  const handleClose = () => {
    navigate(`/itemflashcard/${id}`);
  };

  const calculateTime = () => {
    if (!startTime) return "0 min";
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - startTime) / 60000); // Convert to minutes
    return `${timeDiff} min`;
  };

  const correctCount = questionStates.filter((q) => q.isCorrect).length;
  const incorrectCount = questionStates.length - correctCount;
  const percentage =
    questionStates.length > 0
      ? Math.round((correctCount / questionStates.length) * 100)
      : 0;

  // --------- Render stats ---------
  if (showStats) {
    return (
      <div className="stats-container">
        <button className="btnClose" onClick={handleClose}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>Summary of your test!</h1>
        <div className="stats-content">
          <div className="stats-left">
            <p>{calculateTime()}</p>
            <div className="stats-circle">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#18ae79 ${percentage}%, #da4543 0)`,
                }}
              >
                <span>{percentage}%</span>
              </div>
              <div>
                <p>
                  Correct <span className="correct">{correctCount}</span>
                </p>
                <p>
                  Incorrect <span className="incorrect">{incorrectCount}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="stats-right">
            <h3>Next steps</h3>
            <div className="step-card">
              <p onClick={handleTurnToLearn}>
                <i
                  className="fa-solid fa-spinner"
                  style={{ marginRight: "10px", color: "#4b6aff" }}
                ></i>
                Practise terms in Learn
              </p>
            </div>
          </div>
        </div>
        <div className="answers-review">
          <h3>Your answers</h3>

          {currentFlashcards.map((q, i) => {
            const state = questionStates[i];
            return (
              <div key={i} className="answer-review-card">
                <p className="question-title">
                  <b>{q.term}</b>
                </p>
                <div className="options-review">
                  {q.options.map((opt, idx) => {
                    const isCorrectAnswer = opt === q.definition;
                    const isUserChoice = opt === state?.selectedAnswer;

                    let className = "option-review";
                    if (state?.isCorrect && isCorrectAnswer) {
                      className += " correct-solid";
                    } else if (!state?.isCorrect && isUserChoice) {
                      className += " wrong";
                    } else if (!state?.isCorrect && isCorrectAnswer) {
                      className += " correct-dashed";
                    }

                    return (
                      <div key={idx} className={className}>
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --------- Render questions ---------
  return (
    <div
      className="function-test"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      {!isNavOpen && (
        <button className="btn-nav" onClick={toggleNav}>
          <i className="fa fa-bars"></i>
        </button>
      )}
      <div className={`sidebar ${isNavOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <p>Multiple choice</p>
          <button className="close-nav" onClick={toggleNav}>
            ✕
          </button>
        </div>
        <ul className="question-list">
          {questions.map((_, index) => (
            <li key={index}>
              <button
                className={`question-link ${
                  questionStates[index]?.selectedAnswer ? "answered" : ""
                } ${questionStates[index]?.isSkipped ? "skipped" : ""}`}
                onClick={() => scrollToQuestion(`question-${index + 1}`)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="function-test-maincontent">
        <div className="function-test-main-content">
          <div className="itemflashcard-main">
            {questions.map((question, index) => (
              <div
                key={index}
                id={`question-${index + 1}`}
                className="mode-test-main-content"
              >
                <div className="term-section">
                  <span className="term-label">Definition</span>
                  <div className="term-text">{question.term}</div>
                </div>
                <div className="answer-section">
                  <span className="answer-label">Choose an answer</span>
                  <div className="answer-options">
                    {question.options.map((option, i) => (
                      <button
                        key={i}
                        className={`option ${
                          questionStates[index]?.selectedAnswer === option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswerSelect(
                            index,
                            questionStates[index]?.selectedAnswer === option
                              ? null
                              : option
                          )
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="btn-dont-know">
                    <button
                      className={`dont-know ${
                        questionStates[index]?.isSkipped ? "skipped" : ""
                      }`}
                      onClick={() => handleSkipQuestion(index)}
                    >
                      {questionStates[index]?.isSkipped
                        ? "Skipped"
                        : "Don't know?"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="submit-section">
              <p>All done! Ready to submit your test?</p>
              <button className="submit-button" onClick={handleSubmit}>
                Submit test
              </button>
            </div>
          </div>
          {showModal && (
            <div className="test-modal">
              <div className="test-modal-content">
                <p>You haven't answered all the questions.</p>
                <p>
                  Would you like to review the skipped questions or submit the
                  test now?
                </p>
                <div className="test-modal-buttons">
                  <button
                    className="test-modal-button"
                    onClick={handleReviewSkipped}
                  >
                    Review Skipped Questions
                  </button>
                  <button
                    className="test-modal-button"
                    onClick={handleSubmitNow}
                  >
                    Submit Now
                  </button>
                </div>
              </div>
            </div>
<<<<<<< HEAD
            {showModal && (
              <div className="test-modal">
                <div className="test-modal-content">
                  <p>You haven't answered all the questions.</p>
                  <p>
                    Would you like to review the skipped questions or submit the
                    test now?
                  </p>
                  <div className="test-modal-buttons">
                    <button
                      className="test-modal-button"
                      onClick={handleReviewSkipped}
                    >
                      Review Skipped Questions
                    </button>
                    <button className="test-modal-button" onClick={handleSubmitNow}>
                      Submit Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
=======
          )}
>>>>>>> origin/main
        </div>
      </div>
    </div>
  );
}
