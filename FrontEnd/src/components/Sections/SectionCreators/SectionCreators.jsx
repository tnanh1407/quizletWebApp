import React, { useState } from "react";
import "./CssSectionCreators.css";
import Classes from "./pageCreators/Classes.jsx";
import Subjects from "./pageCreators/Subjects.jsx";
import Tests from "./pageCreators/Tests.jsx";
import Folder from "./pageCreators/Folder.jsx";

export default function SectionCreators({ isPadded, creator }) {
  const [activeTab, setActiveTab] = useState("subjects"); // mặc định là "subjects"

  const renderTabContent = () => {
    switch (activeTab) {
      case "classes":
        return <Classes />;
      case "subjects":
        return <Subjects />;
      case "tests":
        return <Tests />;
      case "folder":
        return <Folder />;
      default:
        return null;
    }
  };

  return (
    <div
      className="creator-main"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
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
          <span
            className={`creator-tab${
              activeTab === "subjects" ? " active" : ""
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            Subjects
          </span>
          <span
            className={`creator-tab${activeTab === "classes" ? " active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            Classes
          </span>
          <span
            className={`creator-tab${activeTab === "tests" ? " active" : ""}`}
            onClick={() => setActiveTab("tests")}
          >
            Pratice Tests
          </span>
          <span
            className={`creator-tab${activeTab === "folder" ? " active" : ""}`}
            onClick={() => setActiveTab("folder")}
          >
            Folder
          </span>
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
        {/* Hiển thị nội dung tab */}
        {renderTabContent()}
      </div>
    </div>
  );
}
