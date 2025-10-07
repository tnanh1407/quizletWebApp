export default function SectionTextbox() {
  return (
    <>
     <h2 className="section-title">
        Textbooks <span className="view-all">View all</span>
      </h2>
        <div className="textbook-card">
          <img  className="textbook-image" />
          <div className="textbook-info">
            <h3 className="book-title"></h3>
            <p className="book-edition"></p>
            <p className="book-authors"></p>
            <button className="solutions-btn"> solutions</button>
          </div>
        </div>
      
    </>
  )
}