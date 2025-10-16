import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";

export default function SectionClass() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    setQuery(q || "");
  }, [location]);
  return (
    <>
      <div className="card-grid">
        <div className="class-card">
          <h3>{query}</h3>
          <FaUsers className="class-icon" />
          <div className="meta">
            <span>
              <PiCardsBold /> flashcard set
            </span>
            <span>
              <FaUsers /> members
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
