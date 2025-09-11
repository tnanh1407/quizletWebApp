
function AchievementCard({title, description, icon, progress, achieved}){
  return(
    <div className="achievement-card">
      <div className="achievement-icon">{icon}</div>
      <h2 className="achievement-title">{title}</h2>
      <p className="achievemnet-description">{description}</p>

      {achieved ? (
        <div className="achievement-status-achieved">Đã hoàn thành</div>
      ) : (
        <div className="achievement-progess">
          <div className="progess-bar">
            <div
            className="progess-fill"
            style={{width: '${progress}%'}}
            ></div>
          </div>
          <p>{progress}% hoàn thành</p>
        </div>
      )}
    </div>
  );
}

export default function Achievements({ isPadded }) {
  {/*const achievements = [
    {
      id : 1,
      title: "Học 10 thẻ đầu tiên",
      description: "Hoàn thành 10 thẻ flashcard đầu tiên",
      icon: "🏆",
      progress: 100,
      achieved: true,
    },
    {
      id: 2,
      title: "Học liên tiếp 7 ngày",
      description: "Duy trì streak 7 ngày học liên tục.",
      icon: "🔥",
      progress: 60,
      achieved: false,
    },
    {
      id: 3,
      title: "Hoàn thành 5 bộ thẻ",
      description: "Tạo và học ít nhất 5 bộ thẻ khác nhau.",
      icon: "📚",
      progress: 30,
      achieved: false,
    },
  ];
  */}
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <h1>Achievements</h1>
          
          {/*<div className="achievemnet-grid">
            {achievements.map((a) => (
              <AchievementCard key={a.id} {...a}/>
            ))}
          </div>
          */}

          <div className="recent-activity">
            <h2>Recent activity</h2>
            <div className="recent-activity-card">
              <p>Recently earned</p>
            </div>
          </div>

          <div className="studying">
            <h2>Studying</h2>
            <div className="studying-card"></div>
          </div>

          <div className="streaks">
            <h2>Streaks</h2>
            <div className="streak-card">
              <div className="daily-stresk-card">
                <h3>Daily streaks</h3>
              </div>

              <div className="weekly-streak-card">
                <h3>Weekly streaks</h3>
              </div>
            </div>
          </div>

          <div className="lifetime">
            <h2>Lifetime</h2>
            <div className="lifttime-card">
              <div className="set-studied-card">
                <h3>Sets studied</h3>
              </div>

              <div className="round-studied-card">
                <h3>Rounds studied</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
