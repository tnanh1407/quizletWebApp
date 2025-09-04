export default function FlashCard({ isPadded }) {
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content"></div>
      </div>
    </div>
  );
}
