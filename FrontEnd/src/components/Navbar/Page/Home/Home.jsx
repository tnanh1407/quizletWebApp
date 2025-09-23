// import React, { useState, useRef } from "react"
import SectionRecents from "../../../Sections/SectionRecents/SectionRecents.jsx";
import SectionNextStudy from "../../../Sections/SectionNextStudy/SectionNextStudy.jsx";
import SectionPopular from "../../../Sections/SectionPopular/SectionPopular.jsx";
import SectionTopCreators from "../../../Sections/SectionTopCreator/SectionTopCreators.jsx";
import Footer from "../../../Footer/Footer.jsx";
import "./CssHome.css";

export default function Home() {
  return (
    <>
      <SectionRecents />
      <SectionNextStudy />
      <SectionPopular />
      <SectionTopCreators />
      <Footer />
    </>
  );
}
