import { createPortal } from "react-dom";
import "./CssModal.css";

export default function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // ngăn sự kiện "bấm ngoài" lan vào
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
