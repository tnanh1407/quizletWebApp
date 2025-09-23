import { useState } from "react";
import "./main.scss";
import { FaAddressCard } from "react-icons/fa";
import { FaUsers, FaUser } from "react-icons/fa";

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
      <div className="main-content-library createClassPage">
        <div className="createClassPage__header">
          <h1>Tạo lớp học mới</h1>
          <button className="button--blue">Create Class</button>
        </div>
        <h3>Một số thông tin cần thiết</h3>
        <div class="createClassPage__input">
          <label for="name">Nhập tên lớp học của bạn</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Công Nghệ Phần Mềm"
          ></input>
        </div>
        <div class="createClassPage__input">
          <label for="oldschools">Nhập tên trường học của bạn</label>
          <input
            id="oldschools"
            name="oldschools"
            type="text"
            placeholder="Công Nghệ Phần Mềm"
          ></input>
        </div>
        <div class="createClassPage__input">
          <label for="describe">Mô tả lớp học của bạn</label>
          <textarea
            id="describe"
            name="describe"
            type="text"
            placeholder="Học vào thứ 6"
          ></textarea>
        </div>
        <div className="createClassPage__input">
          <label for="access">Lựa chọn chế độ truy cập lớp học</label>

          <select name="access" id="access">
            <option value="public"> Công khai</option>
            <option value="private">Cá nhân</option>
          </select>
        </div>
        <div class="createClassPage__input">
          <label>Nhập password của bạn để người khác có thể truy cập</label>
          <input type="password" placeholder=""></input>
        </div>

        <h3>Quản lí truy cập</h3>
        <div class="manageAccess">
          <div class="manageAccess__content">
            <div className="manageAccess__icon">
              <img src="../../../../../../../src/assets/img/image_classroom.svg"></img>
            </div>
            <p>Bạn chưa thêm bất kì thành viên nào trong nhóm lớp</p>
            <button className="button--gray">Thêm thành viên</button>
          </div>
        </div>
      </div>
    </>
  );
}
