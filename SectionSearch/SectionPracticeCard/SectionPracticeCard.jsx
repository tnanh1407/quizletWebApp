export default function SectionPracticeCard() {
  return (
    <>
     {/* Practice tests */}
      <div className="section-header">
        <h2>Practice tests</h2>
        <a href="#" className="view-all">View all</a>
      </div>
      <div className="card-grid">
        
          <div key={i} className="practice-card">
            <h3>title</h3>
            <span className="tag purple">tag</span>
            <div className="author">
              <span>author</span>
            </div>
          </div>
      </div>

    </>
  )
}