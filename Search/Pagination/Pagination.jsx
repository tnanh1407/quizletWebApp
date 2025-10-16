import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PaginationCss.css";

export default function Pagination() {
  const [data, setData] = useState([]); // luôn khởi tạo mảng rỗng
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // thêm loading
  const [error, setError] = useState(null);

  useEffect(() => {
  setLoading(true);
  fetch(`http://localhost:5000/api/items?page=${currentPage}&limit=10`)
    .then((res) => {
      console.log("Fetch status:", res.status);
      return res.json();
    })
    .then((result) => {
      console.log("Data received:", result);
      setData(result.data || []);
      setTotalPages(result.totalPages || 1);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setError(err);
      setLoading(false);
    });
}, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      {/* Pagination Bar */}
      <div className="pagination">
        <button
          className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} /> Previous
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Hiển thị dữ liệu MongoDB */}
      <ul className="data-list">
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> – {item.description}
            </li>
          ))
        ) : (
          <p style={{ color: "#999" }}>No items found.</p>
        )}
      </ul>
    </div>
  );
}