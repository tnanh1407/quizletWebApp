import "../class.css";
import Modal from "../../../../Modal/Modal";
import { useState } from "react";
export default function ModalInvest({ onClose, onSave }) {
  const [data, setData] = useState("");
  const handleSave = () => {
    onSave(data);
    onClose();
  };
  return (
    <>
      <Modal onClose={onClose}>
        <div className="edit-class-modal" id="modal_invest">
          <div className="modal-header">
            <h2>Mời thành viên</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
          <p>
            Để mời thành viên tham gia lớp học này, hãy nhập tên người dùng hoặc
            email Quizlet của họ bên dưới (phân tách bằng dấu phẩy hoặc ngắt
            dòng).
          </p>
          <div className="main--content">
            <input
              type="text"
              placeholder="Nhập tên người dùng hoặc email của bạn "
              onChange={(e) => setData(e.target.value)}
            />
            <button onClick={handleSave}>Gửi lời mời</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
