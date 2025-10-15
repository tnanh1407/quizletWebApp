import "./CssAllResults.css";
import "../CssSearch.css";
import SearchClasses from "../SearchClasses/SearchClasses";
import SearchFlashcard from "../SearchFlashcard/SearchFlashcard";
import SearchUsers from "../SearchUsers/SearchUsers";
// import SearchTextboxs from "../SearchTextbox/SearchTextbox";
// import SearchPracticeCards from "../Practice Card/SearchPracticeCard.Jsx";
// import SearchQuestions from "../SearchQuestion/Question.Jsx";

export default function AllResults() {
  return (
    <>
      <SearchFlashcard />
      {/* <SearchTextboxs /> */}
      {/* <SearchPracticeCards /> */}
      {/* <SearchQuestions /> */}
      <SearchUsers />
      <SearchClasses />
    </>
  );
}
