import "./CssAllResults.css";
import SearchClasses from "../SearchClasses/SearchClasses";
import SearchFlashcard from "../SearchFlashcard/SearchFlashcard";
import SearchUsers from "../SearchUsers/SearchUsers";

export default function AllResults() {
  return (
    <>
      <h1>AllResults</h1>
      <SearchClasses />
      <SearchFlashcard />
      <SearchUsers />
    </>
  );
}
