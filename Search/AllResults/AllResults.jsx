import "./CssAllResults.css";
import "../CssSearch.css";
import SearchClasses from "../SearchClasses/SearchClasses";
import SearchFlashcard from "../SearchFlashcard/SearchFlashcard";
import SearchUsers from "../SearchUsers/SearchUsers";

export default function AllResults() {
  return (
    <>
      <SearchFlashcard />
      <SearchUsers />
      <SearchClasses />
    </>
  );
}
