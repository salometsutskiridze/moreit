import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const professions = [
  { id: "devops",        label: "DevOps",        dot: "#00d2be" },
  { id: "frontend",      label: "Frontend",      dot: "#5b5bff" },
  { id: "backend",       label: "Backend",       dot: "#f59e0b" },
  { id: "cybersecurity", label: "CyberSecurity", dot: "#ff4444" },
  { id: "qa",            label: "QA Engineer",   dot: "#22d3a5" },
];

const reasons = [
  { icon: "✦", title: "უფასო წვდომა",      desc: "ყველასთვის სრულიად უფასო" },
  { icon: "✦", title: "გზამკვლევი", desc: "საჭირო ინფო IT პროფესიებზე" },
  { icon: "✦", title: "Reviews",            desc: "სხვა სტუდენტების გამოცდილება და რჩევები" },
];

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MoreIT | Home";
  }, []);

  return (
    <div className="page home-page">

      {/* ── HERO ── */}
      <section className="home-hero">
        <img src="/logo.png" alt="MoreIT" className="home-logo" />
        <h1 className="page-title">MoreIT</h1>
        <p className="page-sub">IT კარიერის პლატფორმა უფასოდ</p>
        <div className="hero-btns">
          <button className="btn hero-btn" onClick={() => navigate("/courses")}>
            &#9654; EXPLORE COURSES
          </button>
        </div>
      </section>

      {/* ── რა არის MoreIT ── */}
      <section className="home-section">
        <div className="section-box">
          <div className="section-title">&#9632; რა არის MoreIT?</div>
          <p className="home-text">
            MoreIT არის პლატფორმა CS სტუდენტებისთვის, სადაც შეგიძლია
            აღმოაჩინო IT პროფესიები, ისწავლო რეალური პროფესიები და ააგო შენი
            კარიერა პროგრამირებაში.
          </p>
        </div>
      </section>



      {/* ── რატომ MoreIT ── */}
      <section className="home-section">
        <h2 className="home-subtitle">[ რატომ MoreIT? ]</h2>
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <div key={i} className="reason-box">
              <div className="reason-icon">{r.icon}</div>
              <div className="reason-title">{r.title}</div>
              <div className="reason-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="home-section">
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-num">5</div>
            <div className="stat-label">პროფესია</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">FREE</div>
            <div className="stat-label">წვდომა</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">CAREER</div>
            <div className="stat-label">აირჩიე შენი პროფესია</div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-section center-text">
        <h2 className="home-subtitle">[ მზად ხარ დაიწყო? ]</h2>
        <button className="btn hero-btn" onClick={() => navigate("/login")}>
          &#9654; REGISTER NOW
        </button>
      </section>

    </div>
  );
}