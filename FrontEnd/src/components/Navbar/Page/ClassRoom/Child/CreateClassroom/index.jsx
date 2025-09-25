import { useState } from "react";
import "../CreateClassroom/CreateClass.scss";
import { FaUserGroup, FaUserPlus } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";

function CreateClassroom({ isPadded }) {
  const [showModal, setShowModel] = useState(true);

  const handleShowModal = () => {
    setShowModel(true);
  };

  const handleCloseModal = () => {
    setShowModel(false);
  };

  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "20px" }}
      >
        <div className="maincontent">
          {showModal && (
            <div className="popop-overlay">
              <div className="popup-container">
                <RiCloseLargeFill
                  className="popup-close-button"
                  onClick={handleCloseModal}
                />
                <div className="popup-content">
                  <IoPersonAdd className="icon" />
                  <h2>Tạo lớp học miễn phí của bạn</h2>
                  <p>
                    Sắp xếp tài liệu học của bạn và chia sẻ chúng với bạn học
                    của bạn.
                  </p>

                  <form>
                    <input type="text" placeholder="Lớp học mới của bạn" />
                    <input type="text" placeholder="Tên trường" />
                    <div className="popup--footer">
                      <button type="submit" className="create-button">
                        Tạo lớp
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="main-content">
            <div className="main-content-library createClassPage">
              <h1>Tham gia lớp học của bạn</h1>

              <div className="createClassPage__header">
                <div className="createClassPage__left">
                  <img src="./image_classroom.svg" alt="Ảnh" />
                </div>
                <div className="createClassPage__right">
                  <input
                    type="text"
                    className="createClassPage__input"
                    placeholder="Ví dụ : Đại học Mỏ Địa Chất"
                  ></input>
                  <p>Tìm kiếm tên lớp hoặc trường</p>
                  <button
                    className="button--outline createClassPage__button"
                    onClick={() => handleShowModal()}
                  >
                    <FaUserPlus class="margin-10px" />
                    Tạo lớp học mới
                  </button>
                </div>
              </div>
              <div className="createClassPage__content">
                <h3>Các lớp khớp với từ khóa : a</h3>
                <div className="createClassPage__list">
                  <div className="createClassPage__item">
                    <div className="createClassPage__item-content">
                      <ul className="createClassPage__item-header">
                        <li>0 học phần</li>
                        <li className="style-font-color-black">|</li>
                        <li>2 Thành viên</li>
                        <li className="style-font-color-black">|</li>
                        <li>HUMG-Trường Đại Học Mỏ Địa Chất</li>
                      </ul>
                      <p>
                        <FaUserGroup class="icon" />
                        Lớp Toán
                      </p>
                    </div>
                    <button className="button--blue">
                      Gửi yêu cầu tham gia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateClassroom;
