// import React, { useState, useRef } from "react"
import SectionRecents from "../Sections/SectionRecents/SectionRecents.jsx";
import SectionNextStudy from "../Sections/SectionNextStudy/SectionNextStudy.jsx";
import SectionPopular from "../Sections/SectionPopular/SectionPopular.jsx";
import SectionTopCreators from "../Sections/SectionTopCreator/SectionTopCreators.jsx";
import Footer from "../Footer/Footer.jsx";
import "./CssMainContent.css";

export default function MainContent({ isPadded }) {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <SectionRecents />
            <SectionNextStudy />
            <SectionPopular />
            <SectionTopCreators />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
