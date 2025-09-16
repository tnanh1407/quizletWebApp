export default function SectionFlashCards({ id, index, onDelete, listeners }) {
  return (
    <>
      <div className="create-flashcard-main-content">
        <div className="create-flashcard-main-content-header flex">
          <div className="create-flashcard-main-content-header-stt">
            <p>{index}</p>
          </div>
          <div className="create-flashcard-main-content-header-option">
            <button type="button" {...listeners}>
              <div className="button-create-flashcard-main-content-grip-line">
                <i class="fa-solid fa-grip-lines"></i>
              </div>
            </button>
            <button onClick={() => onDelete(id)}>
              <div className="button-create-flashcard-main-content-delete">
                <i class="fa-solid fa-trash"></i>
              </div>
            </button>
          </div>
        </div>
        <div className="create-flashcard-main-content-main">
          <div className="input-term-create-flashcard-main-content-main">
            <input type="text" placeholder="Enter term" />
            <div className="option-input-term-create-flashcard-main-content-main flex">
              <p>TERM</p>
              {/* <button>
                <div className="button-option-term-create-flashcard">
                  <p>CHOOSE LANGUAGE</p>
                </div>
              </button> */}
            </div>
          </div>
          <div className="input-definition-create-flashcard-main-content-main">
            <div className="container-input-definition">
              <input type="text" placeholder="Enter definition" />
              <div className="option-input-definition-create-flashcard-main-content-main flex">
                <p>DEFINITION</p>
                {/* <button>
                  <div className="button-option-definition-create-flashcard">
                    <p>CHOOSE LANGUAGE</p>
                  </div>
                </button> */}
              </div>
            </div>
            {/* <div className="input-definition-create-flashcard-main-img">
              <i class="fa-solid fa-image"></i>
              <p>Image</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
