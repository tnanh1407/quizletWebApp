import { useState } from "react";
import { Link } from "react-router-dom";
import { folderApi } from "../../../../api/folderApi"; // import api

export default function ItemsSeeDemo({
  id,
  title,
  contentCount,
  creator,
  folderId,
  onRemoved,
}) {
  const [isTagOrRemoveTags, setIsTagOrRemoveTags] = useState(false);

  const toggleTagOrRemoveTags = () => {
    setIsTagOrRemoveTags(!isTagOrRemoveTags);
  };

  const handleRemove = async () => {
    try {
      await folderApi.removeFlashcard(folderId, id); // gọi API xóa
      if (onRemoved) onRemoved(id); // báo cho parent cập nhật UI
    } catch (err) {
      console.error("Remove flashcard error:", err);
    }
  };

  return (
    <section id="item-folder">
      {/* nút mở menu */}
      <button
        className="item-folder-button-option"
        onClick={toggleTagOrRemoveTags}
      >
        <div className="button-option">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </button>

      {/* menu ẩn/hiện */}
      <div
        id="item-folder-button-option-menu"
        className={isTagOrRemoveTags ? "block" : "hidden"}
      >
        <button className="flex">
          <i className="fa-solid fa-tag"></i>
          <h3>Tag or remove tags</h3>
        </button>
        <button className="flex" onClick={handleRemove}>
          <i className="fa-solid fa-minus"></i>
          <h3>Remove from folder</h3>
        </button>
      </div>

      {/* nội dung flashcard */}
      <Link to={`/itemflashcard/${id}`} className="">
        <div className="item-folder-main flex">
          <div className="item-folder-main-icon-card">
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="item-folder">
            <h1>{title || "Untitled"}</h1>
            <p>
              Flashcard set • {contentCount || 0} terms • by{" "}
              {creator || "Unknown"}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
