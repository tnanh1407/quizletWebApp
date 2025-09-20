import "./CssNewFolder.css";

export default function NewFolder({ isPadded }) {
  return (
    <div
      className="main flex"
      style={{ paddingLeft: isPadded ? "200px" : "60px" }}
    >
      <div className="maincontent">
        <div className="main-content">
          <h1>Create Folder</h1>
        </div>
      </div>
    </div>
  );
}
