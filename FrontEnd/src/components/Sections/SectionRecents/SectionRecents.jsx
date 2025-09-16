import { Link } from "react-router-dom";
import SectionRecentItem from "./SectionRecentItem/SectionRecentItem";
export default function SectionRecents() {
  return (
    <div className="maincontent-recent margin-bottom-50">
      <h1>Recents</h1>
      <div className="recent-main">
        <SectionRecentItem />
      </div>
    </div>
  );
}
