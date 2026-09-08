import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const courseData = {
  devops:        { label: "DevOps",        dot: "#00d2be" },
  frontend:      { label: "Frontend",      dot: "#5b5bff" },
  backend:       { label: "Backend",       dot: "#f59e0b" }
};

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData[id];

  useEffect(() => {
    document.title = course ? `MoreIT | ${course.label}` : "MoreIT | 404";
  }, [id]);

  if (!course) return (
    <div className="page">
      <h1 className="page-title">[ 404 ]</h1>
      <p className="page-sub">კურსი ვერ მოიძებნა</p>
      <button className="btn" style={{ marginTop: 24 }} onClick={() => navigate("/courses")}>
        &#9664; BACK
      </button>
    </div>
  );

  return (
    
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/courses")}>&#9664; BACK</button>

      <div className="course-hero">
        <div className="course-dot large" style={{ background: course.dot }} />
        <h1 className="page-title">[ {course.label.toUpperCase()} ]</h1>
      </div>

      <div className="course-sections">
        <div className="section-box">
          <div className="section-title">&#9632; MATERIALS</div>
          <div className="section-empty">// კონტენტი მალე დაემატება</div>
        </div>
      </div>
    </div>
    
  );
}
