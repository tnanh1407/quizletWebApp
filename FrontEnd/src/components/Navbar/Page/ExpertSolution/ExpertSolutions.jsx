import SectionFlashCards from "../../../Sections/SectionFlashCardCreate";

export default function ExpertSolutions({ isPadded }) {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <h1>Expert Solution - Sắp Ra Mắt</h1>
          </div>
        </div>
      </div>
    </>
  );
}
