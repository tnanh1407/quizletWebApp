import SectionFlashCards from "../../../Sections/SectionFlashCardCreate.jsx";
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
import { useNavigate } from "react-router-dom";
import "./CssFlashCards.css";
import { getUser } from "../../../../other/storage.js";
import Modal from "../../../Modal/Modal.jsx";

export default function FlashCards() {
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

  const navigate = useNavigate();

  // ===== Handle submit: tạo flashcard với creator info từ userService =====
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const user = getUser(); // ✅ lấy user từ userService
    console.log(user);
    if (!user || !user.id || !user.username || !user.avatar) {
      alert("Cannot fetch user info! Please login again.");
      return;
    }

    const payload = {
      title,
      desc: description,
      content: cards.map((c) => ({
        front: c.front,
        back: c.back,
      })),
      creator: {
        user_id: user.id.toString(),
        username: user.username,
        avatar: user.avatar,
      },
    };
    try {
      const res = await flashCardApi.create(payload, token);
      console.log("Created flashcard set:", res);

      // Reset form
      setTitle("");
      setDescription("");
      setCards([
        { id: "1", front: "", back: "" },
        { id: "2", front: "", back: "" },
      ]);

      alert("Created successfully");
      navigate(`/itemflashcard/${res._id}`);
      console.log(payload);
    } catch (err) {
      console.log(payload);

      console.error("Error creating flashcard:", err);
      alert("Failed to create flashcard set");
    }
  };

  // Import
  const [rawText, setRawText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [parsedData, setParsedData] = useState([]);
  const [openImport, setOpenImport] = useState(false);
  const [termDelimiter, setTermDelimiter] = useState("\t"); // default Tab
  const [cardDelimiter, setCardDelimiter] = useState("\n"); // default newline
  const [customTerm, setCustomTerm] = useState("");
  const [customCard, setCustomCard] = useState("");

  const handleTermChange = (type, value = "") => {
    if (type === "Tab") setTermDelimiter("\t");
    else if (type === "Comma") setTermDelimiter(",");
    else if (type === "Custom") setTermDelimiter(value || customTerm);
  };

  const handleCardChange = (type, value = "") => {
    if (type === "New line") setCardDelimiter("\n");
    else if (type === "Semicolon") setCardDelimiter(";");
    else if (type === "Custom") setCardDelimiter(value || customCard);
  };

  // Tạo placeholder động dựa theo lựa chọn
  const placeholder = [
    `Word 1${termDelimiter}Definition 1`,
    `Word 2${termDelimiter}Definition 2`,
    `Word 3${termDelimiter}Definition 3`,
  ].join(cardDelimiter);

  // ========== XỬ LÝ IMPORT ==========
  const handleImport = () => {
    if (!rawText.trim()) {
      alert("Vui lòng nhập dữ liệu trước khi xem trước!");
      return;
    }

    // 1️⃣ Tách các dòng (mỗi dòng là 1 card)
    const cards = rawText
      .split(cardDelimiter)
      .filter((line) => line.trim() !== "");

    // 2️⃣ Tách từng dòng thành term / definition
    const parsed = cards.map((line) => {
      const parts = line.split(termDelimiter);
      return {
        term: parts[0]?.trim() || "",
        definition: parts.slice(1).join(termDelimiter).trim() || "",
      };
    });

    setParsedData(parsed);
  };

  const handleConfirm = () => {
    if (parsedData.length === 0) {
      alert("Chưa có dữ liệu để import!");
      return;
    }

    // Chuyển parsedData thành danh sách cards mới
    const importedCards = parsedData.map((item) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      front: item.term,
      back: item.definition,
    }));

    // 🧹 Xóa toàn bộ card cũ và thay bằng card import
    setCards(importedCards);

    // Reset modal & input
    setParsedData([]);
    setRawText("");
    setOpenImport(false);

    alert("Import thành công!");
  };

  const toggleImport = () => {
    setOpenImport((prev) => !prev);
  };

  const handleSwapTerms = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        front: card.back,
        back: card.front,
      }))
    );
  };
  return (
    <>
      // Import
      {openImport && (
        <Modal className="modal-import" onClose={toggleImport}>
          <div className="import-flashcard max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <div className="import-header">
              <h4 className="text-2xl font-semibold mb-4 text-center">
                Import your data.
              </h4>
              <button onClick={toggleImport} className="button-close-import">
                <i className="fa-solid fa-xmark close-import"></i>
              </button>
              <label>
                <textarea
                  id="rawText" // added for accessibility and label linking
                  name="rawText" // added for form identification
                  className="custom-textarea"
                  placeholder={placeholder}
                  value={rawText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRawText(value);
                    if (!value.trim()) setParsedData([]);
                  }}
                />
              </label>

              <div className="import-option flex flex-wrap gap-6 text-white">
                {/* Between term and definition */}
                <div className="import-option-term-definition">
                  <h4 className="font-semibold mb-2">
                    Between term and definition
                  </h4>
                  <label className="block">
                    <input
                      type="radio"
                      name="term-def"
                      checked={termDelimiter === "\t"}
                      onChange={() => handleTermChange("Tab")}
                    />{" "}
                    Tab
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="term-def"
                      checked={termDelimiter === ","}
                      onChange={() => handleTermChange("Comma")}
                    />{" "}
                    Comma
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="term-def"
                      checked={!["\t", ","].includes(termDelimiter)}
                      onChange={() => handleTermChange("Custom", customTerm)}
                    />
                    <input
                      type="text"
                      placeholder="Custom"
                      value={customTerm}
                      onChange={(e) => {
                        setCustomTerm(e.target.value);
                        handleTermChange("Custom", e.target.value);
                      }}
                      className="custom-input bg-gray-700 rounded px-2 py-1"
                    />
                  </label>
                </div>

                {/* Between cards */}
                <div className="import-option-cards">
                  <h4 className="font-semibold mb-2">Between cards</h4>
                  <label className="block">
                    <input
                      type="radio"
                      name="cards"
                      checked={cardDelimiter === "\n"}
                      onChange={() => handleCardChange("New line")}
                    />{" "}
                    New line
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="cards"
                      checked={cardDelimiter === ";"}
                      onChange={() => handleCardChange("Semicolon")}
                    />{" "}
                    Semicolon
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cards"
                      checked={!["\n", ";"].includes(cardDelimiter)}
                      onChange={() => handleCardChange("Custom", customCard)}
                    />
                    <input
                      type="text"
                      placeholder="Custom"
                      value={customCard}
                      onChange={(e) => {
                        setCustomCard(e.target.value);
                        handleCardChange("Custom", e.target.value);
                      }}
                      className="custom-input bg-gray-700 rounded px-2 py-1"
                    />
                  </label>
                </div>
              </div>
              <div className=" flex items-center gap-4 mb-4">
                <button
                  onClick={handleImport}
                  className=" button-preview ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Preview
                </button>
              </div>

              {rawText.trim() && parsedData.length > 0 && (
                <div className="mt-4">
                  {/* <h3 className="text-lg font-medium mb-2">Xem trước:</h3> */}
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <div className="import-preview flex">
                      <h4>Preview: </h4>
                      <p> {parsedData.length} cards</p>
                    </div>
                    {parsedData.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="main-flashcard-import flex justify-between py-1 border-b last:border-none"
                        >
                          <div className="main-import-header">
                            <p>{index + 1}</p>
                          </div>
                          <div className="main-import-main flex">
                            <div className="main-import-front">
                              <div className="main-import-item">
                                <p className="font-semibold">{item.term}</p>
                              </div>
                              <h5>TERM</h5>
                            </div>
                            <div className="main-import-back">
                              <div className="main-import-item">
                                <p className="text-gray-700">
                                  {item.definition}
                                </p>
                              </div>
                              <h5>DEFINITION</h5>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="import-footer">
              <div className="footer-button">
                <button className="button-cancel" onClick={toggleImport}>
                  <p>Cancel Import</p>
                </button>
                <button className="button-import" onClick={handleConfirm}>
                  <p>Import</p>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
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
            <button
              className="button-import-flashcard-main"
              onClick={toggleImport}
            >
              <div className="flex">
                <i className="fa-solid fa-plus"></i>
                <p>Import</p>
              </div>
            </button>
            {/* <button className="button-adddiagram-flashcard-main flex">
              <div className="flex">
                <i className="fa-solid fa-plus"></i>
                <p>Add diagram</p>
              </div>
              <div className="lock-flashcard-main">
                <i className="fa-solid fa-lock"></i>
              </div>
            </button> */}
          </div>
          <div className="create-flashcard-maincontent-right flex">
            {/* <button
              className="button-create-flashcard-maincontent-setting"
              onClick={toggleSettingCard}
            >
              <div className="create-flashcard-maincontent-setting">
                <i className="fa-solid fa-gear"></i>
              </div>
            </button> */}
            <button
              className="button-create-flashcard-maincontent-swap"
              onClick={handleSwapTerms}
            >
              <div className="create-flashcard-maincontent-swap">
                <i className="fa-solid fa-right-left"></i>
              </div>
            </button>
            {/* <button className="button-create-flashcard-maincontent-keyboard">
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
            </button> */}
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
