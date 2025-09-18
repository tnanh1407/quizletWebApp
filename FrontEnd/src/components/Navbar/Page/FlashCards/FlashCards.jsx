import SectionFlashCards from "../../../Sections/SectionFlashCardCreate";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flashCardApi } from "../../../../api/flashCardApi.js";

export default function FlashCards({ isPadded }) {
  const [isSettingCard, setIsSettingCard] = useState(false);
  const [isDeleteCard, setIsDeleteCard] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [cards, setCards] = useState([
    { id: "1", front: "", back: "" },
    { id: "2", front: "", back: "" },
  ]);

  const toggleSettingCard = () => setIsSettingCard(!isSettingCard);
  const toggleDeleteCard = () => setIsDeleteCard(!isDeleteCard);

  const addCard = () => {
    setCards([...cards, { id: Date.now().toString(), front: "", back: "" }]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
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

  // gọi API create
  const handleSubmit = async () => {
    const payload = {
      title,
      content: cards.map((c) => ({
        front: c.front,
        back: c.back,
      })),
    };

    try {
      const res = await flashCardApi.create(payload);
      console.log("Created flashcard set:", res);
      alert("Flashcard set created successfully!");

      // 👉 Reset form sau khi tạo thành công
      setTitle("");
      setDescription("");
      setCards([
        { id: "1", front: "", back: "" },
        { id: "2", front: "", back: "" },
      ]);
    } catch (err) {
      console.error("Error creating flashcard:", err);
      alert("Failed to create flashcard set");
    }
  };

  return (
    <>
      {/* popup setting + delete ... giữ nguyên */}

      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="create-flashcard-header flex">
              <div className="create-flashcard-title flex">
                <h1>Create a new flashcard set</h1>
              </div>
              <div className="create-flashcard-title-button">
                <button
                  type="button"
                  className="button-create-flashcard-create"
                  onClick={handleSubmit}
                >
                  <div>
                    <p>Create</p>
                  </div>
                </button>
              </div>
            </div>
            <form
              className="create-flashcard-main"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="button-create-flashcard-main-title">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="button-create-flashcard-main-desc">
                <input
                  type="text"
                  placeholder="Add a description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="create-flashcard-maincontent flex">
                <div className="create-flashcard-maincontent-left flex">
                  <button className="button-import-flashcard-main">
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
                  </button>
                </div>
                <div className="create-flashcard-maincontent-right flex">
                  {/* <p>Suggestions</p> */}
                  <button
                    className="button-create-flashcard-maincontent-setting"
                    onClick={toggleSettingCard}
                  >
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
                  <button
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
                      onUpdate={updateCard} // 👈 truyền xuống
                      card={card} // 👈 truyền state card
                      disableDelete={cards.length < 3}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <div className="button-add-a-card">
                <button type="button" onClick={addCard}>
                  <p>Add a card</p>
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
function SortableCard({
  id,
  index,
  onDelete,
  onUpdate,
  card,
  listeners,
  disableDelete,
}) {
  const {
    attributes,
    listeners: sortableListeners,
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
        onUpdate={onUpdate} // 👈 truyền tiếp
        card={card} // 👈 truyền tiếp
        listeners={{ ...listeners, ...sortableListeners }}
        disableDelete={disableDelete}
      />
    </div>
  );
}
