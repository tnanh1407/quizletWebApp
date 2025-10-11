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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await classroomApi.getById(id);
        setClassRoom(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleJoinRequest = async (user_id, action) => {
    try {
      const updated = await classroomApi.handleJoinRequest(id, {
        user_id,
        action,
      });
      setClassRoom(updated);
    } catch (err) {
      console.error("Error handling request:", err);
      alert("Failed to process request");
    }
  };

  return (
    <div className="member-container">
      <p>
        {classRoom?.pending_users?.length || 0} pending{" "}
        {classRoom?.pending_users?.length === 1 ? "user" : "users"}
      </p>

      {classRoom?.pending_users?.length > 0 ? (
        classRoom.pending_users.map((pending) => (
          <div
            className="member flex"
            key={pending.user_id}
            style={{
              border: "1px solid #ddd",
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

            {(
              classRoom.members.find(
                (m) =>
                  String(m.user_id) === String(user.id) &&
                  (m.role === "Owner" || m.role === "Admin")
              ) || {}
            ).user_id && (
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
        ))
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
}
