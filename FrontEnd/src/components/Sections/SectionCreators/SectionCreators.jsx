import React, { useState } from "react";
import "./CssSectionCreators.css";
import { Link, Outlet } from "react-router-dom";

export default function SectionCreators({ creator }) {
  const [activeTab, setActiveTab] = useState("subjects"); // mặc định là "subjects"

  const handleActiveContent = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="creator-main">
      <div className="creator-content">
        <div className="creator-header">
          <img
            className="creator-avatar"
            src={
              creator?.avatar || "https://i.imgur.com/your-default-avatar.png"
            }
            alt="Creator avatar"
          />
          <div className="creator-info">
            <div className="creator-name-row">
              <span className="creator-name">
                {creator?.name || "Tên người dùng"}
              </span>
              {creator?.role && (
                <span className="creator-role">{creator.role}</span>
              )}
            </div>
          </div>
        </div>
        <div className="creator-tabs">
          <Link
            to="/creators/subjects"
            className={`creator-tab${
              activeTab === "subjects" ? " active" : ""
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            Subjects
          </Link>
          <Link
            to="/creators/classes"
            className={`creator-tab${activeTab === "classes" ? " active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            Classes
          </Link>
          <Link
            to="/creators/tests"
            className={`creator-tab${activeTab === "tests" ? " active" : ""}`}
            onClick={() => setActiveTab("tests")}
          >
            Pratice Tests
          </Link>
          <Link
            to="/creators/folders"
            className={`creator-tab${activeTab === "folder" ? " active" : ""}`}
            onClick={() => setActiveTab("folder")}
          >
            Folder
          </Link>
        </div>
        <div className="creator-search">
          <input
            type="text"
            className="creator-search-input"
            placeholder="Tìm kiếm thẻ ghi nhớ"
          />
          <button className="creator-search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
