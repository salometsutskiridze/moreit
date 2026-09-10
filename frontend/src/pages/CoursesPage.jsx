import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const courses = [
  { id: "frontend",      label: "Frontend",      dot: "#5b5bff", desc: "HTML · CSS · JavaScript · React" },
  { id: "backend",       label: "Backend",       dot: "#f59e0b", desc: "APIs · Databases · C# · Node.js" },
  { id: "devops",        label: "DevOps",        dot: "#00d2be", desc: "CI/CD · Docker · Linux · K8s" }
];

export default function CoursesPage({ user, showToast }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MoreIT | Courses";
  }, []);

  function openCourse(id) {
    if (!user) {
      showToast("კურსის სანახავად გაიარეთ აუტორიზაცია");
      navigate("/login");
      return;
    }
    navigate(`/courses/${id}`);
  }

  return (
    <div className="page">
      <h1 className="page-title">[ COURSES ]</h1>
      <p className="page-sub">აირჩიე შენი IT გზა</p>

      <div className="courses-grid">
        {courses.map(c => (
          <div key={c.id} className="course-card" onClick={() => openCourse(c.id)}>
            <div className="course-dot" style={{ background: c.dot }} />
            <div className="course-label">{c.label}</div>
            <div className="course-desc">{c.desc}</div>
            <span className="course-btn">&#9654; OPEN</span>
          </div>
        ))}
      </div>
    </div>
  );
}