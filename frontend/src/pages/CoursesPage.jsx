import { useNavigate } from "react-router-dom";

const courses = [
  { id: "devops",        label: "DevOps",       dot: "#00d2be", desc: "CI/CD · Docker · Linux · K8s" },
  { id: "frontend",      label: "Frontend",     dot: "#5b5bff", desc: "HTML · CSS · JavaScript · React" },
  { id: "backend",       label: "Backend",      dot: "#f59e0b", desc: "APIs · Databases · C# · Node.js" },
  { id: "cybersecurity", label: "CyberSecurity",dot: "#ff4444", desc: "Networks · Ethical Hacking · CTF" },
  { id: "qa",            label: "QA Engineer",  dot: "#22d3a5", desc: "Testing · Automation · Selenium" },
];

export default function CoursesPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">[ COURSES ]</h1>
      <p className="page-sub">აირჩიე შენი IT გზა</p>

      <div className="courses-grid">
        {courses.map(c => (
          <div key={c.id} className="course-card" onClick={() => navigate(`/courses/${c.id}`)}>
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
