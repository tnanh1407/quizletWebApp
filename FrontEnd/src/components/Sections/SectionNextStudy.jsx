import { Link } from "react-router-dom";
import account from "../../assets/img/account.jpg";

export default function SectionNextStudy() {
  return (
    <div className="maincontent-next-study-session margin-bottom-50 padding-16">
      <h2 className="h2">For your next study session</h2>
      <div className="next-study-session-main flex">
        <button className="btn maincontent-recent-left ">
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <Link to="/flashcard">
          <div className="session all-section">
            <h1>Câu trả lời Đúng/Sai và giải thích</h1>
            <div className="session-terms">
              <p>10 terms</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="" />
              <p>Thien</p>
            </div>
          </div>
        </Link>
        <Link to="/flashcard">
          <div className="session all-section">
            <h1>Câu trả lời Đúng/Sai và giải thích</h1>
            <div className="session-terms">
              <p>10 terms</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="" />
              <p>Thien</p>
            </div>
          </div>
        </Link>
        <Link to="/flashcard">
          <div className="session all-section">
            <h1>Câu trả lời Đúng/Sai và giải thích</h1>
            <div className="session-terms">
              <p>10 terms</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="" />
              <p>Thien</p>
            </div>
          </div>
        </Link>
        <Link to="/flashcard">
          <div className="session all-section">
            <h1>Câu trả lời Đúng/Sai và giải thích</h1>
            <div className="session-terms">
              <p>10 terms</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="" />
              <p>Thien</p>
            </div>
          </div>
        </Link>
        <Link to="/flashcard">
          <div className="session all-section">
            <h1>Câu trả lời Đúng/Sai và giải thích</h1>
            <div className="session-terms">
              <p>10 terms</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="" />
              <p>Thien</p>
            </div>
          </div>
        </Link>
        <Link to="/flashcard">
          <div className="session all-section">
            <h1>Câu trả lời Đúng/Sai và giải thích</h1>
            <div className="session-terms">
              <p>10 terms</p>
            </div>
            <div className="session-author flex">
              <img src={account} alt="" />
              <p>Thien</p>
            </div>
          </div>
        </Link>
        <button className="btn maincontent-recent-right ">
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
