import React, { useEffect, useState } from "react";
import "./CssAllResults.css";
import "../CssSearch.css";
import SectionUser from "../../Sections/SectionSearch/SectionUsers/SectionUser";
import SectionClass from "../../Sections/SectionSearch/SectionClasses/SectionClass";
import SectionFlashCard from "../../Sections/SectionSearch/SectionFlashCard/SectionFlashCard";
import SearchClasses from "../SearchClasses/SearchClasses";
import Footer from "../../Sections/SectionSearch/SectionFb/SectionFooter.jsx";
import { useLocation } from "react-router-dom";
import SearchFlashcard from "../SearchFlashcard/SearchFlashcard";
import SearchUsers from "../SearchUsers/SearchUsers";
import { Link } from "react-router-dom";
// import SearchTextboxs from "../SearchTextbox/SearchTextbox";
// import SearchPracticeCards from "../Practice Card/SearchPracticeCard.Jsx";
// import SearchQuestions from "../SearchQuestion/Question.Jsx";

export default function AllResults() {
 
  return (
    <>
    <div className="SearchFlashcard">
       <h2 className="section-title">
              Flashcard sets
              <Link to="/search/flashcard" className="view-all">
                View all
              </Link>
            </h2>
            <div className="flashcard-grid">
              <SectionFlashCard />
              <SectionFlashCard />
              <SectionFlashCard />
        </div>
    </div>
    <div className="SearchUsers">
      <h2 className="section-title">
        Users{" "}
        <Link to="/search/user" className="view-all">
          View all
        </Link>
      </h2>
      <div className="card-grid">
        <SectionUser />
        <SectionUser />
      </div>
    </div>
    <div className="SearchClasses">
      <h2 className="section-title">
              Classes{" "}
              <Link to="/search/classes" className="view-all">
                View all
              </Link>
            </h2>
            <div className="card-grid">
              <SectionClass />
              <SectionClass />
            </div>
    </div>
    <div className="Footer">
      <Footer />
    </div>
    </>
  );
}
