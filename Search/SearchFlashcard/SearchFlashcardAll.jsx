import React, { useState, useEffect, useRef } from "react";
import "./CssSearchFlashCard.css";
  export default function SearchFilters() {
  const [filters, setFilters] = useState({
    school: "",
    terms: "All",
    createdBy: "All users",
    contentType: "All",
  });

  const [flashcards, setFlashcards] = useState([]); // ✅ kết quả từ backend
  const [activeFilter, setActiveFilter] = useState(null);
  const [schoolInput, setSchoolInput] = useState("");
  const filterRef = useRef(null);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActiveFilter(null);
  };

  const handleToggle = (key) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  const handleClearSchool = () => {
    setSchoolInput("");
    setFilters((prev) => ({ ...prev, school: "" }));
  };

  // click ngoài => đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = {
    terms: ["All", "10", "20", "50"],
    createdBy: ["All users", "My account", "Friends"],
    contentType: ["All", "Flashcards", "Tests", "Notes"],
  };

  // ✅ Gọi API khi filter thay đổi
   useEffect(() => {
    const fetchFiltered = async () => {
      const params = new URLSearchParams(filters);
      const res = await fetch(`http://localhost:5000/api/filters?${params}`);
      const data = await res.json();
      setResults(data);
    };
    fetchFiltered();
  }, [filters])

  return (
    <div className="filters-wrapper" ref={filterRef}>
      <h3 className="filters-title">FILTERS</h3>
      <div className="filters-container">
        {/* SCHOOL FILTER */}
        <div
          className={`filter-item ${activeFilter === "school" ? "active" : ""}`}
          onClick={() => handleToggle("school")}
        >
          School: <span className="value">{filters.school || "All"}</span>
          <span className="chevron">▼</span>

          {activeFilter === "school" && (
            <div
              className="dropdown school-box"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Enter the name of the school"
                value={schoolInput}
                onChange={(e) => setSchoolInput(e.target.value)}
              />
              <div className="school-actions">
                <button className="clear-btn" onClick={handleClearSchool}>
                  Clear
                </button>
                <button
                  className="apply-btn"
                  onClick={() =>
                    handleChange("school", schoolInput || "All")
                  }
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* OTHER FILTERS */}
        {Object.keys(filterOptions).map((key) => (
          <div
            key={key}
            className={`filter-item ${activeFilter === key ? "active" : ""}`}
            onClick={() => handleToggle(key)}
          >
            {key === "terms"
              ? "Number of terms"
              : key === "createdBy"
              ? "Created by"
              : "Content type"}
            : <span className="value">{filters[key]}</span>
            <span className="chevron">▼</span>

            {activeFilter === key && (
              <ul className="dropdown">
                {filterOptions[key].map((option, idx) => (
                  <li key={idx} onClick={() => handleChange(key, option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}