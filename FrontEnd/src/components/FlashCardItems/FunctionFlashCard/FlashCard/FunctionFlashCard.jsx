import "./CssFunctionFlashCard.css";
import { useEffect, useState } from "react";

export default function FunctionFlashCard({ isPadded }) {
  return (
    <>
      <div
        className="main-flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="itemflashcard-main">
              <div className="itemflashcard-main-content">
                <div className="itemflashcard-main-content-header flex">
                  <i class="fa-regular fa-star"></i>
                </div>
                <div className="itemflashcard-main-content-contruction">
                  <h1>Contruction</h1>
                </div>
              </div>
            </div>
            <div className="itemflashcard-main-content-option flex">
              <h1>Track progress</h1>
              <div className="itemflashcard-main-content-option-move flex">
                <button style={{ marginRight: "22px" }}>
                  <i class="fa-solid fa-arrow-left"></i>
                </button>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
