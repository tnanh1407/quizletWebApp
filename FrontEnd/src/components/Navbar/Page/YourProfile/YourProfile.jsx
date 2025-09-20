export default function YourProfile({ isPadded }) {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </>
  );
}
