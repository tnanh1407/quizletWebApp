import { NavLink, Outlet, useParams, useResolvedPath } from "react-router-dom";
import "./DetailClassroom.scss";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaSchool } from "react-icons/fa";
const DetailClassroom = ({ isPadded }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const resolvedPath = useResolvedPath("");
  useEffect(() => {
    fetch(`http://localhost:3000/classroom/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "20px" }}
      >
        <div className="main-content">
          <div className="main-content-library classDetail">
            <div className="classDetail__notice">
              <h5>Mời học sinh tham gia lớp này</h5>
              <span>
                Học sinh có quyền truy cập miễn phí vào các hoạt động và tài
                liệu mà bạn thêm vào lớp học của mình
              </span>
            </div>
            <div className="classDetail__header">
              <div className="classDetail__header--l">
                <h2>{data.name}</h2>
                <span>
                  <FaSchool className="icon-helps" />
                  {data.school}
                </span>
              </div>
              <div className="classDetail__header--r">
                <div className="classDetail__header--r_icon">
                  {" "}
                  <IoIosAdd className="icon" />
                </div>
                <div className="classDetail__header--r_icon">
                  {" "}
                  <IoIosAdd className="icon" />
                </div>
              </div>
            </div>
            <ul className="classDetail__tabs">
              <NavLink to={`${resolvedPath.pathname}/materials`}>
                <li>Tài liệu học</li>
              </NavLink>
              <NavLink to={`${resolvedPath.pathname}/members`}>
                <li>Thành viên</li>
              </NavLink>
            </ul>

            <div className="classDetail__content">
              <Outlet context={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailClassroom;
