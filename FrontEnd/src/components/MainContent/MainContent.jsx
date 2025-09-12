// import React, { useState, useRef } from "react"
import SectionRecents from "../Sections/SectionRecents.jsx";
import SectionNextStudy from "../Sections/SectionNextStudy.jsx";
import SectionPopular from "../Sections/SectionPopular.jsx";
import SectionTopCreators from "../Sections/SectionTopCreators.jsx";
import Footer from "../Footer/Footer.jsx";

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
            <SectionNextStudy />
            {/* <SectionPopular />
            <SectionPopular /> */}
            <SectionTopCreators />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
