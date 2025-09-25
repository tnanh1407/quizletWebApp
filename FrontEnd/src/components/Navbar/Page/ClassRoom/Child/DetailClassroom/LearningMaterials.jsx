import { useOutletContext } from "react-router-dom";

const LearningMaterials = () => {
  const data = useOutletContext();
  return (
    <div className="learningMaterials">
      {/* <h6>Nội dung Tài liệu học</h6>
      <p>Đây là danh sách các tài liệu học của lớp học này.</p> */}
      {data.numberLessons > 0 ? (
        <>
          <div className="learningMaterials__item">
            <div className="learningMaterials__avatar"></div>
            <div className="learningMaterials__title">Tên học phần</div>
            <div className="learningMaterials__info">
              <p>Học phần</p>
              <p></p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h5>Danh sách thành viên</h5>
          <p>Đây là danh sách các học sinh và giáo viên trong lớp</p>
        </>
      )}
    </div>
  );
};

export default LearningMaterials;
