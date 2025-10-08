import { useState } from "react";
import "./CssCreateClass.css";
import { classroomApi } from "../../../../api/classroomApi";
import { getUser } from "../../../../other/storage";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";

export default function CreateClassroom() {
  const user = getUser(); // { id, username }
  const navigate = useNavigate();
  const [classname, setClassname] = useState("");
  const [school, setSchool] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!classname || !school) {
      alert("Please enter the full class name and school name!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: classname,
        university: school,
        description,
        creator: {
          user_id: user?.id,
          username: user?.username,
          avatar: user?.avatar,
        },
      };

      const newClassroom = await classroomApi.create(payload);

      alert("Created successfully");
      const classroomId = newClassroom._id || newClassroom.id;
      navigate(`/class/${classroomId}/material`);

      // reset form
      setClassname("");
      setSchool("");
      setDescription("");
    } catch (error) {
      console.error("Class creation error:", error);
      alert("Failed to create class!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="createClassPage">
      <div className="createClassPage__header">
        <h1>Create a new class</h1>
        <button
          className="button button--primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <div className="createClassPage__form">
        <div className="form__group">
          <label htmlFor="classname">Your new class</label>
          <input
            id="classname"
            type="text"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            placeholder="Example: Software Technology"
          />
        </div>

        <div className="form__group">
          <label htmlFor="school">School name</label>
          <input
            id="school"
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="Example: University of Information Technology"
          />
        </div>

        <div className="form__group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Classes are held every Friday"
          />
        </div>
      </div>
    </div>
  );
}
