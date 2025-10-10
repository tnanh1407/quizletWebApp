import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { classroomApi } from "../../../../api/classroomApi";
import { flashCardApi } from "../../../../api/flashCardApi";
import { getUser } from "../../../../other/storage";
import Footer from "../../../Footer/Footer";
import Modal from "../../../Modal/Modal";

// ICONS
import { LuUniversity } from "react-icons/lu";
import { TbCards } from "react-icons/tb";

import "./CssClassDetail.css";

export default function ClassDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = getUser();

  const [flashCards, setFlashCards] = useState([]);
  const [selectedFlashcards, setSelectedFlashcards] = useState([]);
  const [classRoom, setClassRoom] = useState(null);
  const [classFlashcards, setClassFlashcards] = useState([]);

  const [isAddFlashCard, setIsAddFlashCard] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [className, setClassName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [description, setDescription] = useState("");

  const [isInviteEmail, setIsInviteEmail] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  // Get all flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await flashCardApi.getAll();
        setFlashCards(data);
      } catch (error) {
        console.log("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, []);

  // Get class by Id
  useEffect(() => {
    let isMounted = true;
    classroomApi
      .getById(id)
      .then((data) => {
        if (!isMounted) return;
        setClassRoom(data);
        if (data.flashCards) {
          setClassFlashcards(
            flashCards.filter((fc) => data.flashcards.includes(fc._id))
          );
        }
      })
      .catch((err) => console.error(err));

    return () => {
      isMounted = false;
    };
  }, [id, location.state, flashCards]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await classroomApi.getById(id);
        setClassName(data.title || "");
        setSchoolName(data.university || "");
        setDescription(data.description || "");
      } catch (err) {
        console.error("Error fetching flashcard set:", err);
      }
    };
    fetchData();
  }, [id]);

  const toggleEditClass = () => {
    setShowEdit((prev) => !prev);
  };

  const toggleConfirmDelete = () => {
    setConfirmDelete((prev) => !prev);
  };

  // Toggle add flashcard modal
  const toggleAddFlashCard = () => {
    setIsAddFlashCard((prev) => !prev);
  };

  // Toggle choose flashcard
  const toggleChoose = (flashcardId) => {
    setSelectedFlashcards((prev) =>
      prev.includes(flashcardId)
        ? prev.filter((id) => id !== flashcardId)
        : [...prev, flashcardId]
    );
  };

  // Handle invite by email
  const handleInviteByEmail = async () => {
    if (!inviteEmail) {
      alert("Please enter an email address");
      return;
    }
    try {
      await classroomApi.addMemberByEmail(id, inviteEmail);
      alert(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setIsInviteEmail(false);
    } catch (error) {
      console.error("Error inviting user:", error);
      alert("Failed to invite user. Please check the email again.");
    }
  };

  // Delete class
  const handleDelete = async () => {
    try {
      await classroomApi.delete(id);
      alert("Deleted successfully");
      navigate(`/your-library/classes`, { state: { deleted: true } });
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  // Add flashcards to class
  const handleDone = async () => {
    try {
      const updatedClass = await classroomApi.addFlashcards(
        id,
        selectedFlashcards
      );
      setClassRoom(updatedClass);

      const classFlashcardsIds = updatedClass.flashcards || [];
      const updatedClassFlashcards = flashCards.filter((fc) =>
        classFlashcardsIds.includes(fc._id)
      );
      setClassFlashcards(updatedClassFlashcards);

      alert("Added successfully");
      setIsAddFlashCard(false);
    } catch (error) {
      console.log("id flash card:", classRoom.flashcards.id);
      console.error("Error adding flashcards:", error);
      alert("Error adding flashcards");
    }
  };

  // Remove flashcard from class
  const handleRemoveFlashcard = async (flashcardId) => {
    try {
      const updatedClass = await classroomApi.removeFlashcard(id, flashcardId);
      setClassRoom(updatedClass);
      const classFlashcardsIds = updatedClass.flashcards || [];
      setClassFlashcards(
        flashCards.filter((fc) => classFlashcardsIds.includes(fc._id))
      );
      alert("Removed successfully");
    } catch (err) {
      console.error("Error removing flashcard:", err);
      alert("Error removing flashcard");
    }
  };

  //
  useEffect(() => {
    if (classRoom && flashCards.length > 0) {
      const cardsInClass = flashCards.filter((fc) =>
        classRoom.flashcards?.includes(fc._id)
      );
      setClassFlashcards(cardsInClass);
    }
  }, [classRoom, flashCards]);

  const handleSubmit = async () => {
    const payload = {
      title: className,
      university: schoolName,
      description: description,
    };
    try {
      await classroomApi.update(id, payload);
      alert("Updated successfully");
      setShowEdit(!showEdit);
      navigate(`/class/${id}/material`, { state: { updated: true } });
    } catch (err) {
      console.error("Error updating class:", err);
      alert("Failed to update class");
    }
  };

  return (
    <>
      <div className="ClassDetail">
        {(String(classRoom?.creator.user_id) === String(user.id) ||
          classRoom?.members?.some(
            (m) => String(m.user_id) === String(user.id)
          )) && (
          <div className="element-notice">
            <h5>Welcome to the class!</h5>
            <p>You can view activities and materials shared by the teacher.</p>
          </div>
        )}
        {/* Header */}
        <div className="header_classDetail">
          <div className="header_one">
            <div className="header_one_l">
              <h1>{classRoom?.title}</h1>
              <span className="l_school flex">
                <LuUniversity className="icon-univer" />
                {classRoom?.university}
              </span>
            </div>
            {classRoom?.creator.user_id === user.id && (
              <div className="header_one_r">
                <button className="share-btn" onClick={toggleAddFlashCard}>
                  <i className="fa-solid fa-plus"></i>
                </button>

                <div className="menu-container">
                  <button
                    className="menu-toggle"
                    onClick={() => setShowMenu((prev) => !prev)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>

                  {showMenu && (
                    <div className="class-detail-menu">
                      <button onClick={toggleEditClass} className="flex">
                        <i className="fa-solid fa-pen"></i>
                        <p>Edit</p>
                      </button>
                      <button
                        onClick={toggleConfirmDelete}
                        className="flex delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                        <p>Delete</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {confirmDelete && (
          <Modal onClose={toggleConfirmDelete}>
            <div className="delete-class">
              <div className="edit-class-header">
                <h1>Delete this class?</h1>
                <button onClick={toggleConfirmDelete}>
                  <i className="fa-solid fa-xmark add-flash-cards-icon"></i>
                </button>
              </div>
              <div className="delete-class-main">
                <p>
                  You are about to delete <strong>{classRoom?.title}</strong>
                </p>
                <p>
                  All members will be removed and all content and progress will
                  be deleted. This is a permanent action and cannot be undone.
                </p>
              </div>
            </div>
            <div className="delete-class-footer">
              <button
                type="button"
                onClick={toggleConfirmDelete}
                className="button-cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="button-confirm"
              >
                Yes, delete class
              </button>
            </div>
          </Modal>
        )}
        {showEdit && (
          <Modal onClose={toggleEditClass}>
            <div className="edit-class">
              <div className="edit-class-header">
                <h1>Edit Class</h1>
                <button onClick={toggleEditClass}>
                  <i className="fa-solid fa-xmark add-flash-cards-icon"></i>
                </button>
              </div>
              <div className="edit-class-input">
                <div className="edit-input-item">
                  <p>Class name</p>
                  <input
                    type="text"
                    placeholder="Example: Software Technology"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </div>
                <div className="edit-input-item">
                  <p>School name</p>
                  <input
                    type="text"
                    placeholder="Example: University of Information Technology"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
                <div className="edit-input-item">
                  <p>Description</p>
                  <input
                    type="text"
                    placeholder="Example: Classes are held every Friday"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="edit-class-footer">
              <button type="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </Modal>
        )}
        {/* Modal add flashcards */}
        {isAddFlashCard && (
          <Modal onClose={toggleAddFlashCard} className="add-flash-card">
            <div className="add-flash-cards">
              <div className="add-flash-cards-header">
                <h1>Add Flash Cards</h1>
                <button onClick={toggleAddFlashCard}>
                  <i className="fa-solid fa-xmark add-flash-cards-icon"></i>
                </button>
              </div>

              <div className="add-flash-cards-create flex">
                <p>Your Flash Clash</p>
                <Link to="/create/new-flashcard" className="flex">
                  <i className="fa-solid fa-plus"></i>
                  <p>Create new</p>
                </Link>
              </div>

              {flashCards
                .filter(
                  (card) =>
                    card.delete_flashcard === false &&
                    user &&
                    String(card.creator.user_id) === String(user.id)
                )
                .map((card) => {
                  const cardId = card._id;
                  const isChosen =
                    selectedFlashcards.includes(cardId) ||
                    classRoom?.flashcards?.includes(cardId);

                  return (
                    <div
                      className="recent flex"
                      id="add-flash-card"
                      key={cardId}
                    >
                      <div className="flash-card-left flex">
                        <div className="recent-icon">
                          <TbCards className="icon-flash-card icon-flash-card-recent" />
                        </div>
                        <div className="recent-content">
                          <p>{card.title || "Untitled"}</p>
                          <p>
                            Flashcard set • {card.content_count || 0} terms • by{" "}
                            {card.creator?.username || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => toggleChoose(cardId)}>
                        {isChosen ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-plus"></i>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="add-flash-cards-footer flex">
              <button onClick={handleDone}>
                <p>Done</p>
              </button>
            </div>
          </Modal>
        )}
        {/* Modal invite by email */}
        {isInviteEmail && (
          <Modal
            onClose={() => setIsInviteEmail(false)}
            className="invite-email-modal"
          >
            <div className="invite-email">
              <div className="invite-email-header">
                <h1>Invite Member by Email</h1>
                <button
                  className="button-close"
                  onClick={() => setIsInviteEmail(false)}
                >
                  <i className="fa-solid fa-xmark add-flash-c ards-icon"></i>
                </button>
              </div>

              <div className="invite-email-body">
                <p>Enter the email of the student you want to invite:</p>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              <div className="invite-email-footer flex">
                <button
                  className="cancel"
                  onClick={() => setIsInviteEmail(false)}
                >
                  Cancel
                </button>
                <button className="send" onClick={handleInviteByEmail}>
                  Send Invite
                </button>
              </div>
            </div>
          </Modal>
        )}
        {/* Tabs */}
        {classRoom &&
        (String(classRoom.creator.user_id) === String(user.id) ||
          classRoom.members?.some(
            (member) => String(member.user_id) === String(user.id)
          )) ? (
          <div className="header_two">
            <>
              <NavLink to={`/class/${classRoom?._id}/material`}>
                <button
                  className={`tab ${
                    location.pathname.includes("material") ? "active" : ""
                  }`}
                >
                  Materials
                </button>
              </NavLink>
              <NavLink to={`/class/${classRoom?._id}/member`}>
                <button
                  className={`tab ${
                    location.pathname.includes("member") ? "active" : ""
                  }`}
                >
                  Members
                </button>
              </NavLink>
            </>
          </div>
        ) : (
          <>
            <>
              {classRoom?.pendingMembers?.some(
                (member) => String(member.user_id) === String(user.id)
              ) ? (
                <button
                  className="button-join-class waiting"
                  onClick={async () => {
                    try {
                      await classroomApi.cancelJoinRequest(id, user.id);
                      alert("Canceled join request");
                      // Cập nhật lại dữ liệu lớp
                      const updated = await classroomApi.getById(id);
                      setClassRoom(updated);
                    } catch (error) {
                      console.error("Error canceling join request:", error);
                      alert("Failed to cancel request");
                    }
                  }}
                >
                  <p>Waiting for approval (Cancel request)</p>
                </button>
              ) : classRoom?.members?.some(
                  (member) => String(member.user_id) === String(user.id)
                ) ? (
                <p className="already-joined-text">
                  You have already joined this class
                </p>
              ) : (
                <button
                  className="button-join-class"
                  onClick={async () => {
                    try {
                      await classroomApi.requestJoin(id, user.id);
                      alert("Join request sent");
                      const updated = await classroomApi.getById(id);
                      setClassRoom(updated);
                    } catch (error) {
                      console.error("Error sending join request:", error);
                      alert("Failed to send join request");
                    }
                  }}
                >
                  <p>Request to join class</p>
                </button>
              )}
            </>
          </>
        )}

        {classRoom &&
        (String(classRoom.creator.user_id) === String(user.id) ||
          classRoom.members?.some(
            (member) => String(member.user_id) === String(user.id)
          )) ? (
          <div className="header_three">
            {String(classRoom.creator.user_id) === String(user.id) && (
              <>
                <button className="invite google">
                  <i className="fa-solid fa-folder"></i> Invite with Google
                </button>
                <button
                  className="invite email"
                  onClick={() => setIsInviteEmail(true)}
                >
                  <i className="fa-solid fa-envelope"></i> Invite by email
                </button>
                <button className="invite link">
                  <i className="fa-solid fa-link"></i> Copy link
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="main-nothing">
              <p className="nothing-to-see">Nothing to see here</p>
            </div>
          </>
        )}

        {/* Content */}
        {classRoom &&
          (String(classRoom.creator.user_id) === String(user.id) ||
            classRoom.members?.some(
              (member) => String(member.user_id) === String(user.id)
            )) && (
            <div className="content">
              <Outlet
                context={{
                  flashcards: classFlashcards,
                  onRemoveFlashcard: handleRemoveFlashcard,
                }}
              />
            </div>
          )}
      </div>
      <Footer className="footer" />
    </>
  );
}
