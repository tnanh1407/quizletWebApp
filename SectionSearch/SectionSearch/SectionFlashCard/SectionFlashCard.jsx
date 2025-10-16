import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SectionFlashCard() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    setQuery(q || "");
  }, [location]);
  return (
    <>
      <div className="flashcard-card">
        <h3>{query}</h3>
        <div className="meta">
          <span className="terms">terms terms</span>
          <span className="rating">⭐ rating</span>
        </div>
        <div className="author">
          <span>athur</span>
          <span className="role">User</span>
        </div>
        <button className="preview-btn">Preview</button>
      </div>
    </>
  );
}
