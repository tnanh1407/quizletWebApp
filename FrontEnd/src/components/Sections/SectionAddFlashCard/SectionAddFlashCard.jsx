export default function SectionAddFlashCard({
  isAddFlashCard,
  toggleAddFlashCard,
}) {
  return (
    <>
      {!isAddFlashCard && (
        <div id="newfolder">
          <div className="newfolder-main">
            <p>
              <i className="fa-solid fa-folder"></i>
            </p>
            <input
              type="text"
              placeholder="Name your folder"
              className="input-name-new-folder"
            />
            <div className="newfolder-main-button flex">
              <button className="newfolder-create">
                <span>
                  <Link to="/create/new-folder" onClick={toggleAddFlashCard}>
                    Create
                  </Link>
                </span>
              </button>
              <button className="newfolder-cancel" onClick={toggleAddFlashCard}>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
