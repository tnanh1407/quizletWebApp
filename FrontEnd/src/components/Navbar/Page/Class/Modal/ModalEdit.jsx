import { useState, useEffect } from "react";
import "../class.css";
import Modal from "../../../../Modal/Modal";

export default function ModalEdit({ onClose, onSave, initialData }) {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [allowSection, setAllowSection] = useState(true);
  const [allowInvite, setAllowInvite] = useState(true);
  const [schoolName, setSchoolName] = useState("");

  // Đồng bộ lại state khi initialData thay đổi
  useEffect(() => {
    if (initialData) {
      setClassName(initialData.className || "");
      setDescription(initialData.description || "");
      setAllowSection(initialData.allowSection ?? true);
      setAllowInvite(initialData.allowInvite ?? true);
      setSchoolName(initialData.schoolName || "");
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({
      className,
      description,
      allowSection,
      allowInvite,
      schoolName,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} id="modal_detail">
      <div className="edit-class-modal">
        <div className="modal-header">
          <h2>Sửa lớp</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <label>
            Tên lớp
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Nhập tên lớp"
            />
          </label>

          <label>
            Nhập mô tả (tùy chọn)
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả..."
            />
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={allowSection}
              onChange={(e) => setAllowSection(e.target.checked)}
            />
            Cho phép các thành viên trong lớp thêm và bỏ học phần
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={allowInvite}
              onChange={(e) => setAllowInvite(e.target.checked)}
            />
            Cho phép các thành viên trong lớp mời thành viên mới
          </label>

          <label>
            Tên trường
            <div className="school-input">
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Tên trường"
              />
            </div>
          </label>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleSave}>
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>
  );
}
