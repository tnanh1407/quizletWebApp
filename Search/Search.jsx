import { Link, Outlet } from "react-router-dom";

export default function Search() {
  return (
    <>
      <h1>Results for "Demo"</h1>
      <div className="list-result flex">
        <Link to="/search/allresults">
          <p>All result</p>
        </Link>
        <Link to="/search/flashcard">
          <p>Flashcard</p>
        </Link>
        <Link to="/search/Textbox">
          <p>Textbox</p>
        </Link>
        <Link to="/search/PracticeCard">
          <p>Practice Card</p>
        </Link>
        <Link to="/search/Question">
          <p>Question</p>
        </Link>
        <Link to="/search/user">
          <p>Users</p>
        </Link>
        <Link to="/search/classes">
          <p>Classes</p>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
