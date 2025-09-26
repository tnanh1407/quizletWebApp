import { useState } from "react";
import "./CssCreateClass.css";
import { FaAddressCard } from "react-icons/fa";

export default function CreateClassroom() {
  const [inputPassword, showInputPassword] = useState(true);
  function handleShowInputPassword() {
    showInputPassword(true);
  }

  function handleCloseInputPassword() {
    showInputPassword(false);
  }
  return (
    <>
      <div className="createClassPage">
        {/* Header */}
        <div className="createClassPage__header">
          <h1>Tạo lớp học</h1>
          <button className="button button--primary">Tạo lớp</button>
        </div>

        {/* Form Inputs */}
        <div className="createClassPage__form">
          <div className="form__group">
            <label htmlFor="classname">Tên lớp học</label>
            <input
              id="classname"
              name="classname"
              type="text"
              placeholder="Ví dụ: Công Nghệ Phần Mềm"
            />
          </div>

          <div className="form__group">
            <label htmlFor="school">Tên trường học</label>
            <input
              id="school"
              name="school"
              type="text"
              placeholder="Ví dụ: Đại học CNTT"
            />
          </div>

          <div className="form__group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Ví dụ: Học vào thứ 6 hàng tuần"
            />
          </div>
        </div>

        {/* Manage Access */}
        <h3 className="section__title">Quản lí truy cập</h3>
        <div className="manageAccess">
          <div className="manageAccess__content">
            <FaAddressCard className="manageAccess__icon" />
            <p>Bạn chưa thêm thành viên nào vào lớp</p>
            <button className="button button--secondary">
              + Thêm thành viên
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
