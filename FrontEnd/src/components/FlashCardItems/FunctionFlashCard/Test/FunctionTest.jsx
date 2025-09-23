import "./CssFunctionTest.css";

export default function FunctionTest({ isPadded }) {
  return (
    <>
      <div
        className="function-test"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        {/* <button className="btn-nav">
          <i class="fa fa-bars" style={{ backgroundColor: "#fff" }}></i>
        </button> */}
        <div className="maincontent">
          <div className="main-content">
            <div className="itemflashcard-main">
              <div className="mode-test-main-content">
                <div className="term-section">
                  <span className="term-label">Definition</span>
                  <div className="term-text">phr. căng thẳng, buồn chán</div>
                </div>
                <div className="answer-section">
                  <span className="answer-label">Choose an answer</span>
                  <div className="answer-options">
                    <button className="option">eminent</button>
                    <button className="option">spontaneously</button>
                    <button className="option">invaluable</button>
                    <button className="option">discerning</button>
                  </div>
                  <button className="dont-know">Don't know?</button>
                </div>
              </div>

              <div className="mode-learn-main-content">
                <div className="term-section">
                  <span className="term-label">Definition</span>
                  <div className="term-text">phr. căng thẳng, buồn chán</div>
                </div>
                <div className="answer-section">
                  <span className="answer-label">Choose an answer</span>
                  <div className="answer-options">
                    <button className="option">eminent</button>
                    <button className="option">spontaneously</button>
                    <button className="option">invaluable</button>
                    <button className="option">discerning</button>
                  </div>
                  <button className="dont-know">Don't know?</button>
                </div>
              </div>
              <div className="submit-section">
                <p>All done! Ready to submit your test?</p>
                <button className="submit-button">Submit test</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
