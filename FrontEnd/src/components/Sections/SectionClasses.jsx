import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { classroomApi } from "../../api/classroomApi";
import { getUser } from "../../other/storage";

export default function SectionClasses() {
  const [classes, setClasses] = useState([]);

  const { id } = useParams();
  console.log("id", id);
  const user = getUser();
  console.log(user.id);
  useEffect(() => {
    const fetchData = async () => {
      const data = await classroomApi.getAll();
      setClasses(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {classes
        .filter(
          (cls) =>
            cls.delete_classroom === false &&
            String(cls.creator.user_id) === String(id || user.id)
        )
        .map((cls) => (
          <section className="sectionclasses" key={cls._id}>
            <Link to={`/class/${cls._id}/material`}>
              <div className="main-flashcard">
                <div className="flashcard-creator flex classes">
                  <p>{cls.flashcard_count || 0} sets</p>
                  <span className="span"></span>
                  <p>{cls.member_count || 0} member</p>
                  <span className="span"></span>
                  <p>{cls.title}</p>
                </div>
                <div className="nameflashcard flex">
                  <i className="fa-solid fa-people-group"></i>
                  <h1>{cls.university}</h1>
                </div>
              </div>
            </Link>
          </section>
        ))}
    </>
  );
}