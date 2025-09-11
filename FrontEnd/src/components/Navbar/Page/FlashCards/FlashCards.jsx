import { useState } from "react";
import SectionFlashCards from "../../../Sections/SectionFlashCardCreate";
import Footer from "../../../Footer/Footer.jsx"

export default function FlashCards({ isPadded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([
    {term:"", definition: ""},
    {term:"", definition: ""},
  ]);

  const addCard = () => {
    setCards([...cards, {term: "", definition: ""}]);
  }

  const updateCard = (index, updatedCard) => {
    const newCards = [...cards];
    newCards[index] = updatedCard;
    setCards(newCards);
  }

  const deleteCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  }

  const saveSets = (withPractice = false) => {
    //kiểm tra ít nhất có 2 thẻ không rỗng
    const filtedCarrds = cards.filter(card => card.term.trim() !== "" && card.definition.trim( ) !== "");
    if(filtedCarrds.length < 2) {
      alert("Bạn cần hai thẻ ghi nhớ để tạo học phần. ")
      return;
    }

    const flashcardSet = {
      title,
      description,
      cards: filtedCarrds
    }
    console.log("Đã lưu học phần:", flashcardSet);

    if(withPractice){
      console.log("Chuyển sang chế độ ôn luyện");
    }else{
      console.log("Tạo học phần mới thành công!");
    }
  };

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
                <h1>Tạo một học phần mới</h1>
                
              </div>
              <div className="create-flashcard-title-button">
                <button className="button-create-flashcard-create" onClick={() => saveSets(false)}>
                  <div>
                    <p>Tạo</p>
                  </div>
                </button>
                <button className="button-create-flashcard-create-practice" onClick={() => saveSets(true)}>
                  <div>
                    <p>Tạo và Ôn luyện</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="create-flashcard-main">
              <div className="button-create-flashcard-main-title">
                <input type="text" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="button-create-flashcard-main-desc">
                <input type="text" placeholder="Thêm mô tả..." value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="create-flashcard-maincontent flex">
                <div className="create-flashcard-maincontent-left flex">
                   <button className="button-import-flashcard-main">
                    <div className="flex">
                      <i class="fa-solid fa-plus"></i>
                      <p>Nhập</p>
                    </div>
                  </button>
                  {/*<button className="button-adddiagram-flashcard-main flex">
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
                  {/*<p>Suggestions</p> */}
                  <button className="button-create-flashcard-maincontent-setting">
                    <div className="create-flashcard-maincontent-setting">
                      <i class="fa-solid fa-gear"></i>
                    </div>
                  </button>
                   <button className="button-create-flashcard-maincontent-swap">
                    <div className="create-flashcard-maincontent-swap">
                      <i class="fa-solid fa-right-left"></i>
                    </div>
                  </button> 
                   <button className="button-create-flashcard-maincontent-keyboard">
                    <div className="create-flashcard-maincontent-keyboard">
                      <i class="fa-solid fa-keyboard"></i>
                    </div>
                  </button> 
                  <button className="button-create-flashcard-maincontent-delete">
                    <div className="create-flashcard-maincontent-delete">
                      <i class="fa-solid fa-trash"></i>
                    </div>
                  </button>
                </div>
              </div>
              {cards.map((card, index) =>(
                <SectionFlashCards
                key={index}
                index={index + 1}
                card={card}
                onUpdate={(updatedCard) => updateCard(index, updatedCard)}
                onDelete={() => deleteCard(index)}/>
              ))}
                
              <div className="button-add-a-card">
                <button onClick={addCard}>
                  
                    <p>Thêm thẻ</p>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
