import SectionFlashCards from "../../../Sections/SectionFlashCardCreate";
import Footer from "../../../Footer/Footer.jsx"

export default function FlashCards({ isPadded }) {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="create-flashcard-header flex">
              <div className="create-flashcard-title flex">
                <h1>Create a new flashcard set</h1>
                <p>Saved 7 mins ago</p>
              </div>
              <div className="create-flashcard-title-button">
                <button className="button-create-flashcard-create">
                  <div>
                    <p>Create</p>
                  </div>
                </button>
                <button className="button-create-flashcard-create-practice">
                  <div>
                    <p>Create and practice</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="create-flashcard-main">
              <div className="button-create-flashcard-main-title">
                <input type="text" placeholder="Title" />
              </div>
              <div className="button-create-flashcard-main-desc">
                <input type="text" placeholder="Add a description..." />
              </div>
              <div className="create-flashcard-maincontent flex">
                <div className="create-flashcard-maincontent-left flex">
                  {/* <button className="button-import-flashcard-main">
                    <div className="flex">
                      <i class="fa-solid fa-plus"></i>
                      <p>Import</p>
                    </div>
                  </button>
                  <button className="button-adddiagram-flashcard-main flex">
                    <div className="flex">
                      <i class="fa-solid fa-plus"></i>
                      <p>Add diagram</p>
                    </div>
                    <div className="lock-flashcard-main">
                      <i class="fa-solid fa-lock"></i>
                    </div>
                  </button> */}
                </div>
                <div className="create-flashcard-maincontent-right flex">
                  {/* <p>Suggestions</p> */}
                  <button className="button-create-flashcard-maincontent-setting">
                    <div className="create-flashcard-maincontent-setting">
                      <i class="fa-solid fa-gear"></i>
                    </div>
                  </button>
                  {/* <button className="button-create-flashcard-maincontent-swap">
                    <div className="create-flashcard-maincontent-swap">
                      <i class="fa-solid fa-right-left"></i>
                    </div>
                  </button> */}
                  {/* <button className="button-create-flashcard-maincontent-keyboard">
                    <div className="create-flashcard-maincontent-keyboard">
                      <i class="fa-solid fa-keyboard"></i>
                    </div>
                  </button> */}
                  <button className="button-create-flashcard-maincontent-delete">
                    <div className="create-flashcard-maincontent-delete">
                      <i class="fa-solid fa-trash"></i>
                    </div>
                  </button>
                </div>
              </div>
                <SectionFlashCards/>
                <SectionFlashCards/>
                <SectionFlashCards/>
                <SectionFlashCards/>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
}
