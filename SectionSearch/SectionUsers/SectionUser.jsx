import { FaUsers } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";  

export default function SectionUser() {
  return (
      <div className="card-grid">
        
          <div className="user-card" >
            <img className="avatar" />
            <h3></h3>
            <div className="meta">
              <span><PiCardsBold />  flashcard sets</span>
              <span><FaUsers />  classes</span>
            </div>
          </div>
      </div>
  );
}