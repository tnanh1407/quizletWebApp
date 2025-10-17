import React, { useState, useEffect } from "react";
import "./PendingUser.css";
import { useParams } from "react-router-dom";
import { classroomApi } from "../../../../../../api/classroomApi";
import { getUser } from "../../../../../../other/storage";

export default function PendingUser() {
  const { id } = useParams();
  const user = getUser();
  const [classRoom, setClassRoom] = useState({
    pending_users: [],
    members: [],
  });

  // Fetch classRoom khi component mount hoặc id thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await classroomApi.getById(id);
        setClassRoom(data);
      } catch (err) {
        console.error(
          "Error fetching classroom:",
          err.response?.data || err.message
        );
      }
    };
    fetchData();
  }, [id]);

  // Xử lý Accept / Reject
  const handleJoinRequest = async (user_id, action) => {
    try {
      // Gọi API handle join
      await classroomApi.handleJoinRequest(id, { user_id, action });

      // Fetch lại toàn bộ classRoom để cập nhật pending_users và members
      const updatedClass = await classroomApi.getById(id);
      setClassRoom(updatedClass);
    } catch (err) {
      console.error(
        "Error handling request:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Failed to process request");
    }
  };

  // Kiểm tra người dùng hiện tại có quyền Owner hoặc Admin
  const isAdmin = classRoom.members.some(
    (m) =>
      String(m.user_id) === String(user.id) &&
      (m.role === "Owner" || m.role === "Admin")
  );

  return (
    <div className="member-container">
      <p>
        {classRoom?.pending_users?.length || 0} pending{" "}
        {classRoom?.pending_users?.length === 1 ? "user" : "users"}
      </p>

      {classRoom?.pending_users?.length > 0 &&
        classRoom.pending_users.map((pending) => (
          <div
            className="member flex"
            key={pending.user_id}
            style={{
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "8px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="member-left flex">
              <img
                src={
                  pending.avatar ||
                  "https://firebasestorage.googleapis.com/v0/b/avtquizlet.firebasestorage.app/o/108.3b3090077134db3.jpg?alt=media&token=d605c423-37e8-4070-987d-c0cbdbfffdcb"
                }
                alt=""
              />
              <p>{pending.username}</p>
            </div>

            {isAdmin && (
              <div className="member-right flex">
                <button
                  className="btn-accept"
                  onClick={() => handleJoinRequest(pending.user_id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleJoinRequest(pending.user_id, "reject")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
