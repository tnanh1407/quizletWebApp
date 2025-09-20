import SectionFlashCards from "../../Sections/SectionFlashCardCreate.jsx";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flashCardApi } from "../../../api/flashCardApi.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../EditFlashCards/CssEditFlashCard.css";

export default function FlashCards({ isPadded }) {
  const [isSettingCard, setIsSettingCard] = useState(false);
  const [isDeleteCard, setIsDeleteCard] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([]);

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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await flashCardApi.getById(id);
        setTitle(data.title || "");
        setDescription(data.desc || "");
        setCards(
          data.content.map((c, index) => ({
            id: c._id || index.toString(),
            front: c.front || "",
            back: c.back || "",
          }))
        );
      } catch (err) {
        console.error("Error fetching flashcard set:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const payload = {
      title,
      desc: description,
      content: cards.map((c) => ({
        _id: c.id,
        front: c.front,
        back: c.back,
      })),
    };
    try {
      await flashCardApi.update(id, payload);
      // Chuyển hướng và gửi state
      navigate(`/itemflashcard/${id}`, { state: { updated: true } });
    } catch (err) {
      console.error("Error updating flashcard:", err);
      alert("Failed to update flashcard set");
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
              <Link to={`/itemflashcard/${id}`} className="back-to-set">
                <p>Back to set</p>
              </Link>
              <div className="create-flashcard-title-button">
                <button
                  type="button"
                  className="button-create-flashcard-create"
                  onClick={handleSubmit} // ✅ submit + navigate
                >
                  <div>
                    <p>Done</p>
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
                      <i className="fa-solid fa-plus"></i>
                      <p>Import</p>
                    </div>
                  </button>
                  <button className="button-adddiagram-flashcard-main flex">
                    <div className="flex">
                      <i className="fa-solid fa-plus"></i>
                      <p>Add diagram</p>
                    </div>
                    <div className="lock-flashcard-main">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                  </button>
                </div>
                <div className="create-flashcard-maincontent-right flex">
                  <button
                    className="button-create-flashcard-maincontent-setting"
                    onClick={toggleSettingCard}
                  >
                    <div className="create-flashcard-maincontent-setting">
                      <i className="fa-solid fa-gear"></i>
                    </div>
                  </button>
                  <button className="button-create-flashcard-maincontent-swap">
                    <div className="create-flashcard-maincontent-swap">
                      <i className="fa-solid fa-right-left"></i>
                    </div>
                  </button>
                  <button className="button-create-flashcard-maincontent-keyboard">
                    <div className="create-flashcard-maincontent-keyboard">
                      <i className="fa-solid fa-keyboard"></i>
                    </div>
                  </button>
                  <button
                    className="button-create-flashcard-maincontent-delete"
                    onClick={toggleDeleteCard}
                  >
                    <div className="create-flashcard-maincontent-delete">
                      <i className="fa-solid fa-trash"></i>
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
                      onUpdate={updateCard}
                      card={card}
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
        onUpdate={onUpdate}
        card={card}
        listeners={{ ...listeners, ...sortableListeners }}
        disableDelete={disableDelete}
      />
    </div>
  );
}
