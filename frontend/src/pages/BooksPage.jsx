import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const books = [
  {
    id: "TheJuniorToSenior",
    title: "The Junior To Senior Guidebook",
    author: "Randall Kanna",
    cover: "/books/covers/TheJuniorToSeniorGuidebook.png",
    pdf: "https://drive.google.com/uc?export=download&id=15JqkYTfNBO_j5afqUtjSA9tC-PogE4H1",
    tag: "Universal",
    tagColor: "#adbe2c",
  },
  {
    id: "TheGoodPartsofAWS",
    title: "The Good Parts of AWS",
    author: "Daniel Vassallo",
    cover: "/books/covers/TheGoodPartsOfAWS.jpg",
    pdf: "/books/pdfs/devops.pdf",
    tag: "DevOps",
    tagColor: "#00d2be",
  },
  {
    id: "frontend",
    title: "Frontend Guide",
    author: "TSU MoreIT",
    cover: "/books/covers/frontend.png",
    pdf: "/books/pdfs/frontend.pdf",
    tag: "Frontend",
    tagColor: "#5b5bff",
  },
  {
    id: "backend",
    title: "Backend with C#",
    author: "TSU MoreIT",
    cover: "/books/covers/backend.png",
    pdf: "/books/pdfs/backend.pdf",
    tag: "Backend",
    tagColor: "#f59e0b",
  },
    {
    id: "backend",
    title: "Backend with C#",
    author: "TSU MoreIT",
    cover: "/books/covers/backend.png",
    pdf: "/books/pdfs/backend.pdf",
    tag: "Backend",
    tagColor: "#f59e0b",
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