import "./CssFlashCard.css";

export default function FlashCard({ isPadded }) {
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <h1>Flash Card</h1>
        </div>
      </div>
    </div>
  );
}
