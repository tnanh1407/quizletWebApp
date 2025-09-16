import SectionFlashCards from "../../../Sections/SectionFlashCardCreate";
import Footer from "../../../Footer/Footer.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FlashCards({ isPadded }) {
  const [isSettingCard, setIsSettingCard] = useState(false);

  const toggleSettingCard = () => {
    setIsSettingCard(!isSettingCard);
  };

  const [isDeleteCard, setIsDeleteCard] = useState(false);

  const toggleDeleteCard = () => {
    setIsDeleteCard(!isDeleteCard);
  };

  const [cards, setCards] = useState([{ id: "1" }]);

  const addCard = () => {
    setCards([...cards, { id: Date.now().toString() }]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((c) => c.id === active.id);
      const newIndex = cards.findIndex((c) => c.id === over.id);
      setCards((items) => arrayMove(items, oldIndex, newIndex));
    }
  };
  return (
    <>
      <div
        id="flashcard-setting"
        className={isSettingCard ? "block" : "hidden"}
      >
        <div className="flashcard-main">
          <h1>Manage access</h1>
          <div className="flashcard-main-content flex">
            <div className="flashcard-main-visible-to">
              <h2>VISIBLE TO</h2>
              <button className="button-flashcard-main-visible-to flex">
                <p>Everyone</p>
                <i class="fa-solid fa-lock"></i>
              </button>
              <h2>All Quizlet users can use this set</h2>
            </div>
            <div className="flashcard-main-visible-to">
              <h2>EDITABLE BY</h2>
              <button className="button-flashcard-main-editable flex">
                <p>Just me</p>
                <i class="fa-solid fa-lock"></i>
              </button>
              <h2>Only you can edit this set</h2>
            </div>
          </div>
          <div className="flashcard-line"></div>
          <div className="flashcard-button-save">
            <button
              className="flashcard-button-save"
              onClick={toggleSettingCard}
            >
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
      <div id="flashcard-setting" className={isDeleteCard ? "block" : "hidden"}>
        <div className="flashcard-main">
          <h1>Delete this set ?</h1>
          <p>
            This action will delete and remove the set from your library. This
            cannot be undone
          </p>
          <div className="flashcard-line"></div>
          <div className="flashcard-button">
            <div className="flashcard-button-option">
              <button
                className="flashcard-button-cancel"
                onClick={toggleDeleteCard}
              >
                <p>Cancel</p>
              </button>
              <button className="flashcard-button-delete">
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>
      </div>
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
                {/* <button className="button-create-flashcard-create-practice">
                  <div>
                    <p>Create and practice</p>
                  </div>
                </button> */}
              </div>
            </div>
            <form className="create-flashcard-main">
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
                  <button
                    type="button"
                    className="button-create-flashcard-maincontent-setting"
                    onClick={toggleSettingCard}
                  >
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
                  <button
                    type="button"
                    className="button-create-flashcard-maincontent-delete"
                    onClick={toggleDeleteCard}
                  >
                    <div className="create-flashcard-maincontent-delete">
                      <i class="fa-solid fa-trash"></i>
                    </div>
                  </button>
                </div>
              </div>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={cards.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {cards.map((card, index) => (
                    <SortableCard
                      key={card.id}
                      id={card.id}
                      index={index + 1}
                      onDelete={deleteCard}
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <div className="button-add-a-card">
                <button type="button" onClick={addCard}>
                  <div className="">
                    <p>Add a card</p>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// ===== SORTABLE WRAPPER =====
function SortableCard({ id, index, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <SectionFlashCards
        id={id}
        index={index}
        onDelete={onDelete}
        listeners={listeners || {}}
      />
    </div>
  );
}
