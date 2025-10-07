import React, { useState, useEffect, useRef } from "react";
import imgAccount from "../../../../../../assets/img/account.jpg";
import "./CssMembers.css";
import { Link, useParams } from "react-router-dom";
import { classroomApi } from "../../../../../../api/classroomApi";
import { getUser } from "../../../../../../other/storage";

// icon
import { MdOutlineSwapHoriz } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

const Members = () => {
  const { id } = useParams();
  const user = getUser();
  console.log("id class", id);
  const [classRoom, setClassRoom] = useState({
    member_count: 0,
    members: [],
  });
  const [isOpenMenuMember, setIsOpenMenuMember] = useState(false);

  const menuMemberRef = useRef(null);
  const buttonMenuRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuMemberRef.current &&
        !menuMemberRef.current.contains(event.target) &&
        buttonMenuRef.current &&
        !buttonMenuRef.current.contains(event.target)
      ) {
        setIsOpenMenuMember(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="member-container">
        <p>{classRoom.member_count} members</p>
        {classRoom.members.map((member) => (
          <div className="member flex">
            <div className="member-left flex">
              <img src={classRoom.creator.avatar} alt="" />
              <p>{member.username}</p>
            </div>
            <div className="member-right flex">
              <p>{member.role}</p>
              <button
                className="member-menu"
                ref={buttonMenuRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenMenuMember(true);
                }}
              >
                <i className="fa-solid fa-ellipsis"></i>
                {isOpenMenuMember && (
                  <div id="option-member-menu" ref={menuMemberRef}>
                    <div className="option-menu">
                      <button className="setting-item flex">
                        <MdOutlineSwapHoriz className="icon-member-option" />
                        <p>Make Admin</p>
                      </button>

                      <button className="setting-item flex">
                        <IoMdTrash className="icon-member-option" />
                        <p>Remove</p>
                      </button>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Members;
