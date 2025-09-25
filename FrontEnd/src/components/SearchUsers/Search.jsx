import React, { useState } from "react";
import "./CssSearch.css";
import { FaUsers } from "react-icons/fa";
import { PiCardsBold } from "react-icons/pi";
import { FaTiktok, FaXTwitter, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import "./SearchFlashcard/FlashCard"

export default function Search() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    "All results",
    "Flashcard sets",
    "Practice tests",
    "Study guides",
    "Textbooks",
    "Questions",
    "Users",
    "Classes",
  ];

  const flashcards = [
    {
      title: "Demo quizlet",
      terms: 7,
      author: "Breanna_Rat...",
      role: "Teacher",
      rating: "5 (1)",
    },
    {
      title: "demo flashcards",
      terms: 6,
      author: "Nat_Koleva",
      role: "Teacher",
      rating: "5 (1)",
    },
    {
      title: "Biology Recombinant Plasmid Demo",
      terms: 28,
      author: "Emily_Norfolk",
    },
    {
      title: "System Demo",
      terms: 5,
      author: "KMiuccio",
      rating: "5 (1)",
    },
    {
      title: "Demo Flash Cards",
      terms: 61,
      author: "thereasa_bujnowski",
      rating: "4.8 (5)",
    },
    {
      title: "Demo",
      terms: 12,
      author: "T-hoyt3",
    },
    {
      title: "demo flashcards",
      terms: 6,
      author: "Nat_Koleva",
      role: "Teacher",
      rating: "5 (1)",
    },
    {
      title: "demo flashcards",
      terms: 6,
      author: "Nat_Koleva",
      role: "Teacher",
      rating: "5 (1)",
    },
  ];
  const textbooks = [
    {
      title: "Auditing and Assurance Services Demo",
      edition: "14th Edition · ISBN: 9780133061574",
      authors: "Alvin A Arens, Mark S Beasley, Randal J Elder",
      solutions: 124,
      img: "https://m.media-amazon.com/images/I/81Fmk-9A2uL._AC_UF1000,1000_QL80_.jpg",
    },
  ];
  const studyGuides = [
    { title: "System Demo", author: "stevepalumbo88", tag: "Study guide" },
    { title: "CM1 DÉMO", author: "lisabegic02", tag: "Study guide" },
    { title: "System Demo", author: "john_namey6", tag: "Study guide", role: "Teacher" },
  ];

  const practiceTests = [
    { title: "Patient Care Demo Practice Test", author: "siphubesi", tag: "Practice test" },
    { title: "Math Class Demo Practice Test", author: "Jyoti_Verma1980", tag: "Practice test" },
    { title: "Demo Saw Safety Practice Test", author: "jan_ramirezvelazquez", tag: "Practice test" },
  ];

  const questions = [
    {
      category: "Computer Science",
      question:
        "Which one of the following would contain the translated Java byte code for a program named Demo?",
    },
    {
      category: "Finance",
      question:
        "Home Demo reports the following: Total liabilities = $38,633 million and Total assets = $42,966 million. Compute Home Demo's debt ratio.",
    },
  ];
  const users = [
    {
      name: "demo",
      avatar: "https://via.placeholder.com/60/ff69b4/fff?text=D", // demo img
      flashcards: 0,
      classes: 0,
    },
    {
      name: "Defmo",
      avatar: "https://via.placeholder.com/60/999/fff?text=U",
      flashcards: 0,
      classes: 0,
    },
  ];

  const classes = [
    {
      name: "Demo",
      flashcards: 1,
      members: 1,
    },
    {
      name: "Demo",
      flashcards: 1,
      members: 2,
    },
  ];

  return (
    <div className="search-page">
      <h1>Results for "demo"</h1>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Flashcards */}
      <h2 className="section-title">Flashcard sets<span className="view-all">View all</span></h2>
      <div className="flashcard-grid">
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard-card">
            <h3>{card.title}</h3>
            <div className="meta">
              <span className="terms">{card.terms} terms</span>
              {card.rating && <span className="rating">⭐ {card.rating}</span>}
            </div>
            <div className="author">
              <span>{card.author}</span>
              {card.role && <span className="role">{card.role}</span>}
            </div>
            <button className="preview-btn">Preview</button>
          </div>
        ))}
      </div>
      <h2 className="section-title">
        Textbooks <span className="view-all">View all</span>
      </h2>
      {textbooks.map((book, index) => (
        <div key={index} className="textbook-card">
          <img src={book.img} alt={book.title} className="textbook-image" />
          <div className="textbook-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-edition">{book.edition}</p>
            <p className="book-authors">{book.authors}</p>
            <button className="solutions-btn">{book.solutions} solutions</button>
          </div>
        </div>
      ))}
      {/* Practice tests */}
      <div className="section-header">
        <h2>Practice tests</h2>
        <a href="#" className="view-all">View all</a>
      </div>
      <div className="card-grid">
        {practiceTests.map((item, i) => (
          <div key={i} className="practice-card">
            <h3>{item.title}</h3>
            <span className="tag purple">{item.tag}</span>
            <div className="author">
              <span>{item.author}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="section-header">
        <h2>Questions</h2>
        <a href="#" className="view-all">View all</a>
      </div>
      <div className="card-grid">
        {questions.map((q, i) => (
          <div key={i} className="question-card">
            <h4>{q.category}</h4>
            <p>{q.question}</p>
            <button className="verified-btn">✔ Verified answer</button>
          </div>
        ))}
      </div>
      {/* USERS */}
      <h2 className="section-title">
        Users <a href="#" className="view-all">View all</a>
      </h2>
      <div className="card-grid">
        {users.map((user, idx) => (
          <div className="user-card" key={idx}>
            <img src={user.avatar} alt={user.name} className="avatar" />
            <h3>{user.name}</h3>
            <div className="meta">
              <span><PiCardsBold /> {user.flashcards} flashcard sets</span>
              <span><FaUsers /> {user.classes} classes</span>
            </div>
          </div>
        ))}
      </div>

      {/* CLASSES */}
      <h2 className="section-title">
        Classes <a href="#" className="view-all">View all</a>
      </h2>
      <div className="card-grid">
        {classes.map((cls, idx) => (
          <div className="class-card" key={idx}>
            <h3>{cls.name}</h3>
            <FaUsers className="class-icon" />
            <div className="meta">
              <span><PiCardsBold /> {cls.flashcards} flashcard set</span>
              <span><FaUsers /> {cls.members} members</span>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">
      <div className="footer-columns">
        {/* About us */}
        <div className="footer-col">
          <h4>About us</h4>
          <a href="#">About Quizlet</a>
          <a href="#">Careers</a>
          <a href="#">Advertise with us</a>
          <a href="#">Get the app</a>
        </div>

        {/* For Students */}
        <div className="footer-col">
          <h4>For Students</h4>
          <a href="#">Flashcards</a>
          <a href="#">Test</a>
          <a href="#">Learn</a>
          <a href="#">Study groups</a>
          <a href="#">Solutions</a>
          <a href="#">Quizlet Plus</a>
          <a href="#">Study Guides</a>
          <a href="#">Pomodoro timer</a>
        </div>

        {/* For teachers */}
        <div className="footer-col">
          <h4>For teachers</h4>
          <a href="#">Live</a>
          <a href="#">Blog</a>
          <a href="#">Quizlet Plus for teachers</a>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Help centre</a>
          <a href="#">Honour Code</a>
          <a href="#">Community Guidelines</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">California privacy</a>
          <a href="#">Ad and Cookie Policy</a>
          <a href="#">Interest-Based Advertising</a>
          <a href="#">Quizlet for Schools</a>
          <a href="#">Parents</a>
        </div>

        {/* Language */}
        <div className="footer-col">
          <h4>Language</h4>
          <a href="#">English (UK) ▼</a>
        </div>
      </div>

      {/* Bottom row */}
      <div className="footer-bottom">
        <div className="social-icons">
          <FaTiktok />
          <FaXTwitter />
          <FaFacebook />
          <FaInstagram />
          <FaYoutube />
          <FaLinkedin />
        </div>
        <p>© 2025 Quizlet, Inc.</p>
        <img
          src="https://privacy.truste.com/privacy-seal/seal?rid=example"
          alt="COPPA Safe Harbor"
          className="footer-badge"
        />
      </div>
    </footer>
    </div>
  );
}
