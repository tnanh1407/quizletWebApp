export default function SectionFlashCards({
  id,
  index,
  onDelete,
  onUpdate,
  card,
  listeners,
  disableDelete,
}) {
  return (
    <div className="create-flashcard-main-content">
      <div className="create-flashcard-main-content-header flex">
        <div className="create-flashcard-main-content-header-stt">
          <p>{index}</p>
        </div>
        <div className="create-flashcard-main-content-header-option">
          <button type="button" {...listeners}>
            <div className="button-create-flashcard-main-content-grip-line">
              <i className="fa-solid fa-grip-lines"></i>
            </div>
          </button>
          <button
            onClick={() => onDelete(id)}
            disabled={disableDelete}
            className={`button-trash ${disableDelete ? "disabled" : ""}`}
          >
            <div className="button-create-flashcard-main-content-delete">
              <i className="fa-solid fa-trash"></i>
            </div>
          </button>
        </div>
      </div>

      <div className="create-flashcard-main-content-main">
        {/* Input term & definition */}
        <div className="input-term-create-flashcard-main-content-main">
          <input
            type="text"
            placeholder="Enter term"
            value={card.front}
            onChange={(e) => onUpdate(id, "front", e.target.value)} // 👈 update state
          />
          <div className="option-input-term-create-flashcard-main-content-main flex">
            <p>TERM</p>
          </div>
        </div>
        <div className="input-definition-create-flashcard-main-content-main">
          <div className="container-input-definition">
            <input
              type="text"
              placeholder="Enter definition"
              value={card.back}
              onChange={(e) => onUpdate(id, "back", e.target.value)} // 👈 update state
            />
            <div className="option-input-definition-create-flashcard-main-content-main flex">
              <p>DEFINITION</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
