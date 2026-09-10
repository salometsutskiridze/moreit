import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const books = [
  {
    id: "TheJuniorToSenior",
    title: "The Junior To Senior Guidebook",
    cover: "/books/covers/TheJuniorToSeniorGuidebook.png",
    tag: "Universal",
    tagColor: "#adbe2c",
  },
  {
    id: "TheGoodPartsofAWS",
    title: "The Good Parts of AWS",
    cover: "/books/covers/TheGoodPartsOfAWS.jpg",
    tag: "DevOps",
    tagColor: "#00d2be",
  },
  {
    id: "AdvancedJavascriptUnleashed",
    title: "Advanced Javascript Unleashed",
    cover: "/books/covers/AdvancedJavascriptUnleashed.jpg",
    tag: "Frontend",
    tagColor: "#5b5bff",
  },
  {
    id: "ModernCssForBetterUX",
    title: "Modern CSS For Better User Experience",
    cover: "/books/covers/ModernCssForBetterUserExperience.png",
    tag: "Frontend",
    tagColor: "#5b5bff",
  },
  {
    id: "BuildingADatabaseEngine",
    title: "Building A Database Engine",
    cover: "/books/covers/BuildingADatabaseEngine.png",
    tag: "Backend",
    tagColor: "#f59e0b", 
  },
  {
    id: "BunSecurityEssentials",
    title: "Bun Security Essentials",
    cover: "/books/covers/BunSecurityEssentials.png",
    tag: "Universal",
    tagColor: "#adbe2c",
  },
  {
    id: "SeniorEngineerMindset",
    title: "Senior Engineer Mindset",
    cover: "/books/covers/SeniorEngineerMindset.png",
    tag: "Universal",
    tagColor: "#adbe2c",
  },
];

export default function BooksPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MoreIT | Books";
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">[ BOOKS ]</h1>
      <p className="page-sub">უფასო წიგნები IT სფეროსთვის</p>

      <div className="books-grid">
        {books.map(b => (
          <div key={b.id} className="book-card" onClick={() => navigate(`/books/${b.id}`)}>
            <div className="book-cover">
              <img src={b.cover} alt={b.title} className="book-cover-img"
                onError={e => { e.target.style.display = "none"; }}
              />
              <div className="book-cover-fallback">
                <span className="book-cover-title"></span>
              </div>
            </div>
            <div className="book-info">
              <span className="book-tag" style={{ color: b.tagColor }}>&#9900; {b.tag}</span>
              <div className="book-title">{b.title}</div>
              <div className="book-desc">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}