import "./CssFunctionLearn.css";

export default function FunctionLearn({ isPadded }) {
  return (
    <>
      <div
        className="function-learn"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="itemflashcard-main">
              <div className="mode-learn-main-content">
                <div className="term-section">
                  <span className="term-label">Term</span>
                  <div className="term-text">have one's hands full</div>
                </div>
                <div className="answer-section">
                  <span className="answer-label">Choose an answer</span>
                  <div className="answer-options">
                    <button className="option">
                      1 phr. phát huy tối đa tiềm năng của ai
                    </button>
                    <button className="option">2 phr. rát bàn</button>
                    <button className="option">
                      3 phr. văn bản chấp thuận
                    </button>
                    <button className="option">4 phr. ngòi ké tiếp nhận</button>
                  </div>
                  <button className="dont-know">Don't know?</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
