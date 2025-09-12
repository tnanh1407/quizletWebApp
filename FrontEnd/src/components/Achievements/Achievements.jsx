import { useState } from "react";
import {DayPicker} from 'react-day-picker';
import { addMonths, subMonths } from "date-fns";

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

const imgMapping = {
  'Flashcard whiz' : badgeStudiedWithFlashcards,
  'Active learner' : badgeStudiedWithLearn,
  'Committed learner' : badgeStudiedWithLearn,
  'Match whiz' : badgeStudiedWithFlashcards,
  'Night owl' : bageNightOwl,
  'Early bird' : bageEarlyBird,
  'Test acer' : badgeStudiedWithTest,
  'Set builder' : badgeStudiedWithMatch,
  'Match marker' : bageFirstHighscoreInMatch,
  'Exam ready' : lockedbadgeCreatedFirstPracticeTest,

  '3-day streak' : bageDay,
  '5-day streak' : bageDay,
  '7-day streak' : bageDay,
  '10-day streak' : bageDay,
  '20-day streak' : bageDay,
  '30-day streak' : bageDay,

  '3-week streak' : badgeWeek,
  '5-week streak' : badgeWeek,
  '7-week streak' : badgeWeek,
  '10-week streak' : badgeWeek,
  '20-week streak' : badgeWeek,
  '30-week streak' : badgeWeek,

  'Studied first set' : bageSetsStudied,
  '3 sets studied' : bageSetsStudied,
  '5 sets studied' : bageSetsStudied,
  '10 sets studied' : bageSetsStudied,
  '25 sets studied' : bageSetsStudied,
  '50 sets studied' : bageSetsStudied,

  'Studied first round': bageRoundsStudied,
  '3 rounds studied': bageRoundsStudied,
  '5 rounds studied': bageRoundsStudied
};

const fallbackImage = '../../assets/img_achievements/fallback.svg';

const getNumber = (text) => {
  if(text.toLowerCase().includes('first')){
    return '1';
  }
  const match = text.match(/^\d+|\d+\s*(?:sets?|rounds?)/i);
  return match ? match[0].replace(/\s*(sets?|rounds?)/i, ''):'';
};

const getImageSrc = (text) => {
  return imgMapping[text] || fallbackImage;
};

export default function Achievements({ isPadded }) {
  const [month, setMonth] = useState(new Date());
  
  const prevMonth = () => {
    setMonth(subMonths(month, 1));
  };

  const nextMonth = () => {
    setMonth(addMonths(month, 1));
  }



  
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "300px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <h1>Achievements</h1>
          <h2>Recent activity</h2>
          <div className="container">
            <div className="recent-activity-card">
              <div className="column column-1">
                <h4>Recently earned</h4>
                <span className="column-content">3-day streak</span>
                <div className="AchievementImage" >
                  <img
                    src={getImageSrc('3-day streak')}
                    alt="3-day streak"
                    className="earned"
                  />
                  <span className="number-overlay earned"></span>
                </div>
              </div>
              <div className="column column-2">
                <h4>Calender</h4>
                <div className="CalendarBox">
                  <DayPicker
                    mode="single"
                    month={month}
                    onMonthChange={setMonth}
                    captionLayout="dropdown-buttons"
                    showOutsideDays
                    className={{
                      root: 'calendar-root',
                      month: 'calendar-month',
                      caption: 'calendar-caption',
                      nav: 'calendar-nav',
                      nav_button_previous: 'calendar-nav-button',
                      nav_button_next: 'calendar-nav-button',
                      table: 'calendar-table',
                      head: 'calendar-head',
                      cell: 'calendar-cell',
                      day: 'calendar-day',
                      day_selected: 'calendar-day-selected',
                      day_today: 'calendar-day-today',
                    }}
                    modifiersClassNames={{
                      selected: 'calendar-day-selected',
                      today: 'calendar-day-today',
                    }}
                  />
                  <div className="calender-nav">
                    <button onClick={prevMonth} className="calender-nav-button">Prev</button>
                    <button onClick={nextMonth} className="calender-nav-button">Next</button>
                  </div> 
                </div>
              </div>
              <div className="column column-3">
                <h4>Current streak</h4>
                <div className="containerBox"></div>
              </div>
            </div>
            
          </div>

          <h2>Studying</h2>
          <div className="container">
            <div className="container-column"> 
              <div className="container-grid">
                {[
                  { text: 'Flashcard whiz', earned: true},
                  { text: 'Active learner', earned: true},
                  { text: 'Committed learner', earned: false},
                  { text: 'Match whiz', earned: true },
                  { text: 'Night owl', earned: true },
                  { text: 'Early bird', earned: true },
                  { text: 'Test acer', earned: true },
                  { text: 'Set builder', earned: true },
                  { text: 'Match marker', earned: true },
                  { text: 'Exam ready', earned: false },
                ]. map((item, index) => (
                  <div className="container-card" key={index}>
                    <div className="container-image">
                      <img 
                      src={getImageSrc(item.text)}
                      alt={item.text}
                      className={item.earned ? 'earned':'unearned'}
                      />
                    </div>
                    <p className="container-text">{item.text}</p>
                    <span className="container-date">{item.earned ? 'Earned':''}</span>
                  </div>
                ))}               
              </div>
              </div>
            </div>
          

          <h2>Streaks</h2>
          <div className="container">
            <div className="container-column">
              <p className="container-title">Daily streaks</p> 
              <div className="container-grid">
                {[
                  { text: '3-day streak', earned: true },
                  { text: '5-day streak', earned: true },
                  { text: '7-day streak', earned: true },
                  { text: '10-day streak', earned: true },
                  { text: '20-day streak', earned: true },
                  { text: '30-day streak', earned: false },
                ].map((item, index) => (
                  <div className="container-card" key={index}>
                    <div className="container-image">
                      <img
                      src={getImageSrc(item.text, item.earned)}
                      alt={item.text}
                      className={item.earned ? 'earned':'unearned'}
                      />
                      {getNumber(item.text) && (
                        <span
                          className={`number-overlay ${item.earned ? 'earned' : 'unearned'}`}
                        >
                          {getNumber(item.text)}
                        </span>
                      )}
                    </div>
                    <p className="container-text">{item.text}</p>
                    <span className="container-date">{item.earned ? 'Earned':''}</span>
                  </div>
                ))}
              <div className="btn">
                <button type="button" className="btn-container">
                  <span className="btn-container-detail">View all</span>
                </button>
              </div>
            </div>
            

            <div className="container-column">
              <p className="container-title">Weekly streaks</p>
              <div className="container-grid">
                {[
                  { text: '3-week streak', earned: true },
                  { text: '5-week streak', earned: true },
                  { text: '7-week streak', earned: true },
                  { text: '10-week streak', earned: true },
                  { text: '20-week streak', earned: true },
                  { text: '30-week streak', earned: false },
                ].map((item, index) => (
                  <div className="container-card" key={index}>
                    <div className="container-image">
                      <img
                        src={getImageSrc(item.text, item.earned)}
                        alt={item.text}
                        className={item.earned ? 'earned' : 'unearned'}
                      />
                      {getNumber(item.text) && (
                        <span
                          className={`number-overlay ${item.earned ? 'earned' : 'unearned'}`}
                        >
                          {getNumber(item.text)}
                        </span>
                      )}
                    </div>
                    <p className="container-text">{item.text}</p>
                    <span className="container-date">{item.earned ? 'Earned' : ''}</span>
                  </div>
                ))}
                </div>
              </div>
              
              <div className="btn">
                <button type="button" className="btn-container">
                  <span className="btn-container-detail">View all</span>
                </button>
              </div>
            </div>
          </div>

          <h2>Lifetime</h2>
          <div className="container">
            <div className="container-column">
              <p className="container-title">Sets studied</p> 
              <div className="container-grid">
                {[
                  { text: 'Studied first set', earned: true },
                  { text: '3 sets studied', earned: true },
                  { text: '5 sets studied', earned: true },
                  { text: '10 sets studied', earned: true },
                  { text: '25 sets studied', earned: true },
                  { text: '50 sets studied', earned: false },
                ].map((item, index) => (
                  <div className="container-card" key={index}>
                    <div className="container-image">
                      <img
                        src={getImageSrc(item.text, item.earned)}
                        alt={item.text}
                        className={item.earned ? 'earned' : 'unearned'}
                      />
                      {getNumber(item.text) && (
                        <span
                          className={`number-overlay ${item.earned ? 'earned' : 'unearned'}`}
                        >
                          {getNumber(item.text)}
                        </span>
                      )}
                    </div>
                    <p className="container-text">{item.text}</p>
                    <span className="container-date">{item.earned ? 'Earned' : ''}</span>
                  </div>
                ))}
              </div>
              
              <div className="btn">
                <button type="button" className="btn-container">
                  <span className="btn-container-detail">View all</span>
                </button>
              </div>
            </div>
            

            <div className="container-column">
              <p className="container-title">Rounds studied</p>
              <div className="container-grid">
                {[
                  { text: 'Studied first round', earned: true },
                  { text: '3 rounds studied', earned: true },
                  { text: '5 rounds studied', earned: true }, 
                ].map((item, index) => (
                  <div className="container-card" key={index}>
                    <div className="container-image">
                      <img
                        src={getImageSrc(item.text, item.earned)}
                        alt={item.text}
                        className={item.earned ? 'earned' : 'unearned'}
                      />
                      {getNumber(item.text) && (
                        <span
                          className={`number-overlay ${item.earned ? 'earned' : 'unearned'}`}
                        >
                          {getNumber(item.text)}
                        </span>
                      )}
                    </div>
                    <p className="container-text">{item.text}</p>
                    <span className="container-date">{item.earned ? 'Earned' : ''}</span>
                  </div>
                ))}               
              </div>
              
              <div className="btn">
                <button type="button" className="btn-container">
                  <span className="btn-container-detail">View all</span>
                </button>
              </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}
