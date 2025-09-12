import { Link } from "react-router-dom";
import account from "../../../../assets/img/account.jpg";

export default function SectionNextStudyItem() {
  return (
    <>
      <Link to="/itemflashcard">
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
    </>
  );
}
