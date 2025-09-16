import account from "../../assets/img/account.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FlashCard({ isPadded }) {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9999/v1/flashcards/${id}`)
      .then((res) => res.json())
      .then((data) => setFlashcard(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!flashcard) return <p>Loading...</p>;
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <div className="itemflashcard-header">
            <div className="itemflashcard-header-option flex">
              <div className="itemflashcard-header-option-left">
                <p>Social Science</p>
              </div>
              <div className="itemflashcard-header-option-right flex">
                <button className="flex">
                  <i class="fa-regular fa-bookmark"></i>
                  <p>Save</p>
                </button>
                <button>
                  <i class="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                <button>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
            <div className="itemflashcard-header-title">
              <h1>{flashcard.title}</h1>
              <div className="itemflashcard-header-title-review flex">
                <div className="title-review-study-day flex">
                  <i class="fa-regular fa-star"></i>
                  <p>{flashcard.metadata.likes} likes</p>
                </div>
                <div className="title-review-growth flex">
                  <i class="fa-regular fa-star"></i>
                  <p>{flashcard.metadata.views} views</p>
                </div>
              </div>
              <div className="itemflashcard-header-title-solution">
                <a href="" className="flex">
                  <div className="title-solution title-solution-flashcard">
                    <i class="fa-solid fa-id-card"></i>
                    <p>Flashcards</p>
                  </div>
                </a>
                <a href="" className="flex">
                  <div className="title-solution title-solution-learn">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <p>Learn</p>
                  </div>
                </a>
                <a href="" className="flex">
                  <div className="title-solution title-solution-test">
                    <i class="fa-solid fa-file-lines"></i>
                    <p>Test</p>
                  </div>
                </a>
                <a href="" className="flex">
                  <div className="title-solution title-solution-block">
                    <i class="fa-solid fa-table-cells-large"></i>
                    <p>Blocks</p>
                  </div>
                </a>
                <a href="" className="flex">
                  <div className="title-solution title-solution-blast">
                    <i class="fa-solid fa-rocket"></i>
                    <p>Blast</p>
                  </div>
                </a>
                <a href="" className="flex">
                  <div className="title-solution title-solution-match">
                    <i class="fa-brands fa-connectdevelop"></i>
                    <p>Match</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="itemflashcard-main">
            <div className="itemflashcard-main-content">
              <div className="itemflashcard-main-content-header flex">
                <div className="itemflashcard-main-content-header-hint flex">
                  <i class="fa-solid fa-lightbulb"></i>
                  <p>Get a hint</p>
                </div>
                <i class="fa-regular fa-star"></i>
              </div>
              <div className="itemflashcard-main-content-contruction">
                <h1>Contruction</h1>
              </div>
            </div>
            <div className="itemflashcard-main-content-option flex">
              <h1>Track progress</h1>
              <div className="itemflashcard-main-content-option-move flex">
                <button>
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <p>1/30</p>
                <button>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              <div className="itemflashcard-main-content-option-option">
                <button>
                  <i class="fa-solid fa-play"></i>
                </button>
                <button>
                  <i class="fa-solid fa-shuffle"></i>
                </button>
                <button>
                  <i class="fa-solid fa-gear"></i>
                </button>
                <button>
                  <i class="fa-solid fa-expand"></i>
                </button>
              </div>
            </div>
            <div className="itemflashcard-main-created flex">
              <img src={account} alt="" />
              <div className="itemflashcard-main-created-in4">
                <p>Created by</p>
                <h2>{flashcard.creator.username}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
