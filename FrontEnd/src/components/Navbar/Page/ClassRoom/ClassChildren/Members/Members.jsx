import React, { useState, useEffect, useRef } from "react";
import "./CssMembers.css";
import { useParams } from "react-router-dom";
import { classroomApi } from "../../../../../../api/classroomApi";
import { getUser } from "../../../../../../other/storage";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const Members = () => {
  const { id } = useParams();
  const user = getUser();

  const [classRoom, setClassRoom] = useState({
    member_count: 0,
    members: [],
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    classroomApi
      .getById(id)
      .then((data) => {
        if (!isMounted) return;
        setClassRoom(data);
      })
      .catch((err) => console.error(err));

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Click ra ngoài đóng menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = (e, memberId) => {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === memberId ? null : memberId)); // Sử dụng user_id
  };

  const handleRemoveMember = async (userIdToRemove) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        const updatedClassroom = await classroomApi.removeMember(
          id,
          userIdToRemove
        );
        setClassRoom(updatedClassroom);
        setOpenMenuId(null); // Đóng menu sau khi xóa
        alert("Member removed successfully.");
      } catch (error) {
        console.error("Failed to remove member:", error);
        alert(
          "Failed to remove member. " +
            (error.response?.data?.message || "Please try again.")
        );
      }
    }
  };

  return (
    <div className="member-container" ref={containerRef}>
      <p>{classRoom.member_count} members</p>

      {classRoom.members.map((member, index) => (
        <div className="member flex" key={member.user_id || index}>
          <div className="member-left flex">
            <img
              src={
                member.avatar ||
                "https://firebasestorage.googleapis.com/v0/b/avtquizlet.firebasestorage.app/o/108.3b3090077134db3.jpg?alt=media&token=d605c423-37e8-4070-987d-c0cbdbfffdcb"
              }
              alt=""
            />
            <p>{member.username}</p>
          </div>

          <div className="member-right flex">
            <p>{member.role}</p>

            {member.role !== "Owner" && (
              <div className="member-menu-wrapper">
                <button
                  className="member-menu"
                  onClick={(e) => handleToggleMenu(e, member.user_id)}
                >
                  <i className="fa-solid fa-ellipsis"></i>
                </button>

                {openMenuId === member.user_id && (
                  <div className="option-member-menu">
                    <div className="option-menu">
                      <button className="setting-item flex">
                        <MdOutlineSwapHoriz className="icon-member-option" />
                        <p>Make Admin</p>
                      </button>

                      <button
                        className="setting-item flex"
                        onClick={() => handleRemoveMember(member.user_id)}
                      >
                        <IoMdTrash className="icon-member-option" />
                        <p>Remove</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Members;
