import React from "react";
import { useOutletContext } from "react-router-dom";

const LearningMaterials = () => {
  // Sử dụng useOutletContext() để lấy dữ liệu từ Outlet
  // const data = useOutletContext();

  return (
    <div>
      <h3>Tài liệu học của lớp </h3>
      <p>Đây là danh sách các tài liệu học của lớp học này.</p>
    </div>
  );
};

export default LearningMaterials;
