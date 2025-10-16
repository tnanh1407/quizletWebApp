import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    setQuery(q || "");
  }, [location]);
  return (
    <>
      <div style={{ color: "white", }}>
      {query ? (
        <h2>
          Search Results for:{" "}
          <span style={{ color: "#white" }}>{query}</span>
        </h2>
      ) : (
        <h2>No search term provided</h2>
      )}
    </div>
      <div className="list-result flex">
        <Link to={`/search/allresults?q=${query}`}><p>All result</p></Link>
      <Link to={`/search/flashcard?q=${query}`}><p>Flashcard</p></Link>
      <Link to={`/search/user?q=${query}`}><p>Users</p></Link>
      <Link to={`/search/classes?q=${query}`}><p>Classes</p></Link>
      </div>
      <Outlet />
    </>
  );
}
