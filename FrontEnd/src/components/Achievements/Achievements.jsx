import Footer from "../Footer/Footer.jsx";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { addMonths, subMonths } from "date-fns";
import "react-day-picker/style.css";

import bageCreatedFirstSet from "../../assets/img_achievements/badge-CreatedFirstSet.svg";
import bageDay from "../../assets/img_achievements/badge-Day.svg";
import bageEarlyBird from "../../assets/img_achievements/badge-EarlyBird.svg";
import bageFirstHighscoreInMatch from "../../assets/img_achievements/badge-FirstHighscoreInMatch.svg";
import bageNightOwl from "../../assets/img_achievements/badge-NightOwl.svg";
import bageRoundsStudied from "../../assets/img_achievements/badge-RoundsStudied.svg";
import bageSetsStudied from "../../assets/img_achievements/badge-SetsStudied.svg";
import badgeStudiedWithFlashcards from "../../assets/img_achievements/badge-StudiedWithFlashcards.svg";
import badgeStudiedWithLearn from "../../assets/img_achievements/badge-StudiedWithLearn.svg";
import badgeStudiedWithMatch from "../../assets/img_achievements/badge-StudiedWithMatch.svg";
import badgeStudiedWithTest from "../../assets/img_achievements/badge-StudiedWithTest.svg";
import badgeWeek from "../../assets/img_achievements/badge-Week.svg";
import lockedbadgeCreatedFirstPracticeTest from "../../assets/img_achievements/locked-badge-CreatedFirstPracticeTest.svg";
import streakFlame from "../../assets/img_achievements/streak-flame.svg"

const imgMapping = {
  "Flashcard whiz": badgeStudiedWithFlashcards,
  "Active learner": badgeStudiedWithLearn,
  "Committed learner": badgeStudiedWithLearn,
  "Match whiz": badgeStudiedWithFlashcards,
  "Night owl": bageNightOwl,
  "Early bird": bageEarlyBird,
  "Test acer": badgeStudiedWithTest,
  "Set builder": badgeStudiedWithMatch,
  "Match marker": bageFirstHighscoreInMatch,
  "Exam ready": lockedbadgeCreatedFirstPracticeTest,

  "3-day streak": bageDay,
  "5-day streak": bageDay,
  "7-day streak": bageDay,
  "10-day streak": bageDay,
  "20-day streak": bageDay,
  "30-day streak": bageDay,
  "45-day streak": bageDay,
  "60-day streak": bageDay,
  "70-day streak": bageDay,
  "80-day streak": bageDay,

  "3-week streak": badgeWeek,
  "5-week streak": badgeWeek,
  "10-week streak": badgeWeek,
  "20-week streak": badgeWeek,
  "30-week streak": badgeWeek,
  "40-week streak": badgeWeek,
  "52-week streak": badgeWeek,
  "60-week streak": badgeWeek,
  "70-week streak": badgeWeek,
  "80-week streak": badgeWeek,
  "90-week streak": badgeWeek,
  "104-week streak": badgeWeek,
  "125-week streak": badgeWeek,
  "156-week streak": badgeWeek,
  "175-week streak": badgeWeek,
  "204-week streak": badgeWeek,

  "Studied first set": bageSetsStudied,
  "3 sets studied": bageSetsStudied,
  "5 sets studied": bageSetsStudied,
  "10 sets studied": bageSetsStudied,
  "25 sets studied": bageSetsStudied,
  "50 sets studied": bageSetsStudied,
  "75 sets studied": bageSetsStudied,
  "100 sets studied": bageSetsStudied,
  "150 sets studied": bageSetsStudied,
  "200 sets studied": bageSetsStudied,
  "250 sets studied": bageSetsStudied,
  "300 sets studied": bageSetsStudied,
  "350 sets studied": bageSetsStudied,
  "400 sets studied": bageSetsStudied,
  "450 sets studied": bageSetsStudied,
  "500 sets studied": bageSetsStudied,
  "600 sets studied": bageSetsStudied,
  "700 sets studied": bageSetsStudied,
  "800 sets studied": bageSetsStudied,
  "900 sets studied": bageSetsStudied,
  "1000 sets studied": bageSetsStudied,
  "1500 sets studied": bageSetsStudied,
  "2000 sets studied": bageSetsStudied,
  "2500 sets studied": bageSetsStudied,
  "3000 sets studied": bageSetsStudied,
  "3500 sets studied": bageSetsStudied,
  "4000 sets studied": bageSetsStudied,
  "4500 sets studied": bageSetsStudied,
  "5000 sets studied": bageSetsStudied,

  "Studied first round": bageRoundsStudied,
  "3 rounds studied": bageRoundsStudied,
  "5 rounds studied": bageRoundsStudied,
  "10 rounds studied": bageRoundsStudied,
  "25 rounds studied": bageRoundsStudied,
  "50 rounds studied": bageRoundsStudied,
  "75 rounds studied": bageRoundsStudied,
  "100 rounds studied": bageRoundsStudied,
  "150 rounds studied": bageRoundsStudied,
  "200 rounds studied": bageRoundsStudied,
  "250 rounds studied": bageRoundsStudied,
  "300 rounds studied": bageRoundsStudied,
  "350 rounds studied": bageRoundsStudied,
  "400 rounds studied": bageRoundsStudied,
  "450 rounds studied": bageRoundsStudied,
  "500 rounds studied": bageRoundsStudied,
  "600 rounds studied": bageRoundsStudied,
  "700 rounds studied": bageRoundsStudied,
  "800 rounds studied": bageRoundsStudied,
  "900 rounds studied": bageRoundsStudied,
  "1000 rounds studied": bageRoundsStudied,
  "1500 rounds studied": bageRoundsStudied,
  "2000 rounds studied": bageRoundsStudied,
  "2500 rounds studied": bageRoundsStudied,
  "3000 rounds studied": bageRoundsStudied,
  "3500 rounds studied": bageRoundsStudied,
  "4000 rounds studied": bageRoundsStudied,
  "4500 rounds studied": bageRoundsStudied,
  "5000 rounds studied": bageRoundsStudied,
};

const fallbackImage = "../../assets/img_achievements/fallback.svg";

const getNumber = (text) => {
  if (text.toLowerCase().includes("first")) {
    return "1";
  }
  const match = text.match(/^\d+|\d+\s*(?:sets?|rounds?)/i);
  return match ? match[0].replace(/\s*(sets?|rounds?)/i, "") : "";
};

const getImageSrc = (text) => {
  return imgMapping[text] || fallbackImage;
};

export default function Achievements({ isPadded }) {
  const [month, setMonth] = useState(new Date());
  const [showAllDaily, setShowAllDaily] = useState(false);
  const [showAllWeekly, setShowAllWeekly] = useState(false);
  const [showAllSets, setShowAllSets] = useState(false);
  const [showAllRounds, setShowAllRounds] = useState(false);

  const allAchievements = {
    studying: [
      { text: "Flashcard whiz", earned: true, dateEarned: "2024-01-04" },
      { text: "Active learner", earned: true, dateEarned: "2025-03-12" },
      { text: "Committed learner", earned: false },
      { text: "Match whiz", earned: true, dateEarned: "2025-06-09" },
      { text: "Night owl", earned: true, dateEarned: "2023-12-18" },
      { text: "Early bird", earned: true, dateEarned: "2025-04-26" },
      { text: "Test acer", earned: true, dateEarned: "2025-01-01" },
      { text: "Set builder", earned: true, dateEarned: "2025-06-05" },
      { text: "Match marker", earned: true, dateEarned: "2025-06-09" },
      { text: "Exam ready", earned: false },
    ],
    dailyStreaks: [
      { text: "3-day streak", earned: true, dateEarned: "2025-04-02" },
      { text: "5-day streak", earned: true, dateEarned: "2025-04-04" },
      { text: "7-day streak", earned: true, dateEarned: "2025-06-22" },
      { text: "10-day streak", earned: true, dateEarned: "2025-06-25" },
      { text: "20-day streak", earned: true, dateEarned: "2025-07-05" }, 
      { text: "30-day streak", earned: false},
      { text: "45-day streak", earned: false },
      { text: "60-day streak", earned: false },
      { text: "70-day streak", earned: false},
      { text: "80-day streak", earned: false },
    ],
    weeklyStreaks: [
      { text: "3-week streak", earned: true, dateEarned: "2025-03-10" },
      { text: "5-week streak", earned: true, dateEarned: "2025-06-29" },
      { text: "10-week streak", earned: false },
      { text: "20-week streak", earned: false },
      { text: "30-week streak", earned: false },
      { text: "40-week streak", earned: false },
      { text: "52-week streak", earned: false },
      { text: "60-week streak", earned: false },
      { text: "70-week streak", earned: false },
      { text: "80-week streak", earned: false },
      { text: "90-week streak", earned: false },
      { text: "104-week streak", earned: false },
      { text: "125-week streak", earned: false },
      { text: "156-week streak", earned: false },
      { text: "175-week streak", earned: false },
      { text: "204-week streak", earned: false },
    ],
    setsStudied: [
      { text: "Studied first set", earned: true, dateEarned: "2023-12-18" },
      { text: "3 sets studied", earned: true, dateEarned: "2024-01-04" },
      { text: "5 sets studied", earned: true, dateEarned: "2024-04-29" },
      { text: "10 sets studied", earned: true, dateEarned: "2024-06-31" },
      { text: "25 sets studied", earned: true, dateEarned: "2025-02-27" },
      { text: "50 sets studied", earned: true, dateEarned: "2025-04-01" },
      { text: "75 sets studied", earned: true, dateEarned: "2025-06-22" },
      { text: "100 sets studied", earned: false },
      { text: "150 sets studied", earned: false },
      { text: "200 sets studied", earned: false },
      { text: "250 sets studied", earned: false },
      { text: "300 sets studied", earned: false },
      { text: "350 sets studied", earned: false },
      { text: "400 sets studied", earned: false },
      { text: "450 sets studied", earned: false },
      { text: "500 sets studied", earned: false },
      { text: "600 sets studied", earned: false },
      { text: "700 sets studied", earned: false },
      { text: "800 sets studied", earned: false },
      { text: "900 sets studied", earned: false },
      { text: "1000 sets studied", earned: false },
      { text: "1500 sets studied", earned: false },
      { text: "2000 sets studied", earned: false },
      { text: "2500 sets studied", earned: false },
      { text: "3000 sets studied", earned: false },
      { text: "3500 sets studied", earned: false },
      { text: "4000 sets studied", earned: false },
      { text: "4500 sets studied", earned: false },
      { text: "5000 sets studied", earned: false },
    ],
    roundsStudied: [
      { text: "Studied first round", earned: true, dateEarned: "2025-04-26" },
      { text: "3 rounds studied", earned: true, dateEarned: "2025-04-26" },
      { text: "5 rounds studied", earned: true, dateEarned: "2025-06-17" },
      { text: "10 rounds studied", earned: false },
      { text: "25 rounds studied", earned: false },
      { text: "50 rounds studied", earned: false },
      { text: "75 rounds studied", earned: false },
      { text: "100 rounds studied", earned: false },
      { text: "150 rounds studied", earned: false },
      { text: "200 rounds studied", earned: false },
      { text: "250 rounds studied", earned: false },
      { text: "300 rounds studied", earned: false },
      { text: "350 rounds studied", earned: false },
      { text: "400 rounds studied", earned: false },
      { text: "450 rounds studied", earned: false },
      { text: "500 rounds studied", earned: false },
      { text: "600 rounds studied", earned: false },
      { text: "700 rounds studied", earned: false },
      { text: "800 rounds studied", earned: false },
      { text: "900 rounds studied", earned: false },
      { text: "1000 rounds studied", earned: false },
      { text: "1500 rounds studied", earned: false },
      { text: "2000 rounds studied", earned: false },
      { text: "2500 rounds studied", earned: false },
      { text: "3000 rounds studied", earned: false },
      { text: "3500 rounds studied", earned: false },
      { text: "4000 rounds studied", earned: false },
      { text: "4500 rounds studied", earned: false },
      { text: "5000 rounds studied", earned: false },
    ],
  };

  // Logic để lấy recently earned: Lấy tất cả earned achievements, sort theo dateEarned descending, lấy cái đầu tiên
  const getRecentlyEarned = () => {
    const earnedList = Object.values(allAchievements).flat().filter(item => item.earned && item.dateEarned);
    earnedList.sort((a, b) => new Date(b.dateEarned) - new Date(a.dateEarned)); // Sort descending (gần nhất trước)
    return earnedList[0] || { text: "No recent achievements", earned: false }; // Fallback nếu không có
  };

  const recentlyEarned = getRecentlyEarned();
  
  // Ngày học (16/09/2025) có streak
  const streakDate = new Date("2025-09-16");

  // Kiểm tra xem có ngày nào trong lịch có streak hay không
  const hasStreak = month.getFullYear() === streakDate.getFullYear() && month.getMonth() === streakDate.getMonth();

  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "300px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <div className="achievements">
            <h1>Achievements</h1>
            <h2>Recent activity</h2>
            <div className="container">
              <div className="recent-activity-card">
                <div className="column column-1">
                  <h4>Recently earned</h4>
                  <span className="column-content">{recentlyEarned.text}</span>
                  <div className="AchievementImage">
                    <div className="container-image">
                      <img
                        src={getImageSrc(recentlyEarned.text)}
                        alt={recentlyEarned.text}
                        className={recentlyEarned.earned ? "earned" : "unearned"}
                      />
                      {getNumber(recentlyEarned.text) && (
                        <span
                          className={`number-overlay ${recentlyEarned.earned ? "earned" : "unearned"}`}
                        >
                          {getNumber(recentlyEarned.text)}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
                <div className="column column-2">
                  {/*<h4>Calender</h4>*/}
                  <div className="CalendarBox">
                    <DayPicker
                      mode="single"
                      month={month}
                      onMonthChange={setMonth}
                      captionLayout="dropdown-buttons"
                      showOutsideDays
                      modifiers={{
                        streakDay: streakDate
                        
                      }}
                      modifiersClassNames={{
                        streakDay: 'streak-day',
                        selected: "calendar-day-selected",
                        today: "calendar-day-today"
                        
                      }}
                      className={{
                        root: "calendar-root",
                        month: "calendar-month",
                        caption: "calendar-caption",
                        nav: "calendar-nav",
                        nav_button_previous: "calendar-nav-button",
                        nav_button_next: "calendar-nav-button",
                        table: "calendar-table",
                        head: "calendar-head",
                        cell: "calendar-cell",
                        day: "calendar-day",
                        day_selected: "calendar-day-selected",
                        day_today: "calendar-day-today",
                      }}
                    />
                  </div>
                </div>
                
                <div className="column column-3">
                  <h4>Current streak</h4>
                  <div className="StreakBox">
                    {hasStreak && (
                      <>
                        <p>1-week streak</p>
                        <img src={streakFlame} alt="Streak Flame" className="streak-flame" />
                      </>
                    )}
                    {!hasStreak && <p>NO PROGRESS YET</p>}
                  </div>
                </div>
              </div>
            </div>

            <h2>Studying</h2>
            <div className="container">
              <div className="container-column">
                <div className="container-grid">
                  {allAchievements.studying.map((item, index) => (
                    <div className="container-card" key={index}>
                      <div className="container-image">
                        <img
                          src={getImageSrc(item.text)}
                          alt={item.text}
                          className={item.earned ? "earned" : "unearned"}
                        />
                        {getNumber(item.text) && (
                          <span
                            className={`number-overlay ${item.earned ? "earned" : "unearned"}`}
                          >
                            {getNumber(item.text)}
                          </span>
                        )}
                      </div>
                      <p className="container-text">{item.text}</p>
                      {item.earned && item.dateEarned && (
                        <span className="earned-date">
                          Earned {new Date(item.dateEarned).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2>Streaks</h2>
            <div className="container">
              <div className="container-column">
                <p className="container-title">Daily streaks</p>
                <div
                  className="container-grid"
                  style={{ display: showAllDaily ? "grid" : "grid" }}
                >
                  {allAchievements.dailyStreaks
                    .slice(0, showAllDaily ? allAchievements.dailyStreaks.length : 6)
                    .map((item, index) => (
                      <div className="container-card" key={index}>
                        <div className="container-image">
                          <img
                            src={getImageSrc(item.text)}
                            alt={item.text}
                            className={item.earned ? "earned" : "unearned"}
                          />
                          {getNumber(item.text) && (
                            <span
                              className={`number-overlay ${item.earned ? "earned" : "unearned"}`}
                            >
                              {getNumber(item.text)}
                            </span>
                          )}
                        </div>
                        <p className="container-text">{item.text}</p>
                        {item.earned && item.dateEarned && (
                          <span className="earned-date">
                            Earned {new Date(item.dateEarned).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
                <div className="btn">
                  <button
                    type="button"
                    className="btn-container"
                    onClick={() => setShowAllDaily(!showAllDaily)}
                  >
                    <span className="btn-container-detail">
                      {showAllDaily ? "View fewer" : "View all"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="container-column">
                <p className="container-title">Weekly streaks</p>
                <div
                  className="container-grid"
                  style={{ display: showAllWeekly ? "grid" : "grid" }}
                >
                  {allAchievements.weeklyStreaks
                    .slice(0, showAllWeekly ? allAchievements.weeklyStreaks.length : 6)
                    .map((item, index) => (
                      <div className="container-card" key={index}>
                        <div className="container-image">
                          <img
                            src={getImageSrc(item.text)}
                            alt={item.text}
                            className={item.earned ? "earned" : "unearned"}
                          />
                          {getNumber(item.text) && (
                            <span
                              className={`number-overlay ${item.earned ? "earned" : "unearned"}`}
                            >
                              {getNumber(item.text)}
                            </span>
                          )}
                        </div>
                        <p className="container-text">{item.text}</p>
                        {item.earned && item.dateEarned && (
                          <span className="earned-date">
                            Earned {new Date(item.dateEarned).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
                <div className="btn">
                  <button
                    type="button"
                    className="btn-container"
                    onClick={() => setShowAllWeekly(!showAllWeekly)}
                  >
                    <span className="btn-container-detail">
                      {showAllWeekly ? "View fewer" : "View all"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <h2>Lifetime</h2>
            <div className="container">
              <div className="container-column">
                <p className="container-title">Sets studied</p>
                <div
                  className="container-grid"
                  style={{ display: showAllSets ? "grid" : "grid" }}
                >
                  {allAchievements.setsStudied
                    .slice(0, showAllSets ? allAchievements.setsStudied.length : 12)
                    .map((item, index) => (
                      <div className="container-card" key={index}>
                        <div className="container-image">
                          <img
                            src={getImageSrc(item.text)}
                            alt={item.text}
                            className={item.earned ? "earned" : "unearned"}
                          />
                          {getNumber(item.text) && (
                            <span
                              className={`number-overlay ${item.earned ? "earned" : "unearned"}`}
                            >
                              {getNumber(item.text)}
                            </span>
                          )}
                        </div>
                        <p className="container-text">{item.text}</p>
                        {item.earned && item.dateEarned && (
                          <span className="earned-date">
                            Earned {new Date(item.dateEarned).toLocaleDateString()}
                          </span>
                        )}
                      </div> 
                    ))}
                </div>
                <div className="btn">
                  <button
                    type="button"
                    className="btn-container"
                    onClick={() => setShowAllSets(!showAllSets)}
                  >
                    <span className="btn-container-detail">
                      {showAllSets ? "View fewer" : "View all"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="container-column">
                <p className="container-title">Rounds studied</p>
                <div
                  className="container-grid"
                  style={{ display: showAllRounds ? "grid" : "grid" }}
                >
                  {allAchievements.roundsStudied
                    .slice(0, showAllRounds ? allAchievements.roundsStudied.length : 6)
                    .map((item, index) => (
                      <div className="container-card" key={index}>
                        <div className="container-image">
                          <img
                            src={getImageSrc(item.text)}
                            alt={item.text}
                            className={item.earned ? "earned" : "unearned"}
                          />
                          {getNumber(item.text) && (
                            <span
                              className={`number-overlay ${item.earned ? "earned" : "unearned"}`}
                            >
                              {getNumber(item.text)}
                            </span>
                          )}
                        </div>
                        <p className="container-text">{item.text}</p>
                        {item.earned && item.dateEarned && (
                          <span className="earned-date">
                            Earned {new Date(item.dateEarned).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
                <div className="btn">
                  <button
                    type="button"
                    className="btn-container"
                    onClick={() => setShowAllRounds(!showAllRounds)}
                  >
                    <span className="btn-container-detail">
                      {showAllRounds ? "View fewer" : "View all"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
