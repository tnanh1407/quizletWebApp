import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";

export default function SectionUser() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    setQuery(q || "");
  }, [location]);
  return (
    <div className="card-grid">
      <div className="user-card">
        <img className="avatar" />
        <h3>{query}</h3>
        <div className="meta">
          <span>
            <PiCardsBold /> flashcard sets
          </span>
          <span>
            <FaUsers /> classes
          </span>
        </div>
      </div>
    </div>
  );
}
