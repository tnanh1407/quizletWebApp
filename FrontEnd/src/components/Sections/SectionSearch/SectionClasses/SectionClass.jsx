import { FaUsers } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";
export default function SectionClass() {
  return (
    <>
      <div className="card-grid">
        <div className="class-card">
          <h3></h3>
          <FaUsers className="class-icon" />
          <div className="meta">
            <span>
              <PiCardsBold /> flashcard set
            </span>
            <span>
              <FaUsers /> members
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
