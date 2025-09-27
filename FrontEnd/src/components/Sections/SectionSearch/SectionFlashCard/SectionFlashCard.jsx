export default function SectionFlashCard() {
  return (
    <>
      <div className="flashcard-card">
        <h3>title</h3>
        <div className="meta">
          <span className="terms">terms terms</span>
          <span className="rating">⭐ rating</span>
        </div>
        <div className="author">
          <span>athur</span>
          <span className="role">User</span>
        </div>
        <button className="preview-btn">Preview</button>
      </div>
    </>
  );
}
