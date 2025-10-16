import "./CssSearchUsers.css";
import "../CssSearch.css";
import { Link } from "react-router-dom";
import SectionUser from "../../Sections/SectionSearch/SectionUsers/SectionUser";
import Footer from "../../Sections/SectionSearch/SectionFb/SectionFooter.jsx";

export default function SearchUsers() {
  
  return (
    <>
    <div className="card-grid">
            <SectionUser />
            <SectionUser />
            <SectionUser />
            <SectionUser />
            <SectionUser />
            <SectionUser />
            <SectionUser />
            <SectionUser />
            <SectionUser />
    </div>
    <div className="PreviosAndNext">
      
    </div>
    <div className="Footer">
      <Footer />
    </div>
      </>
  );
}
