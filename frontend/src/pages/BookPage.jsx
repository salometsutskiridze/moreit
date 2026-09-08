import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const books = {
  TheJuniorToSenior: {
    title: "The Junior To Senior Guidebook",
    author: "Randall Kanna",
    cover: "/books/covers/TheJuniorToSeniorGuidebook.png",
    pdf: "https://drive.google.com/uc?export=download&id=15JqkYTfNBO_j5afqUtjSA9tC-PogE4H1",
    desc: "This book is all you need to confidently build a developer career. It's what they don't teach you in courses or university.",
    tag: "Universal", tagColor: "#adbe2c",
    pages: "76",
  },
  TheGoodPartsofAWS: {
    title: "The Good Parts of AWS",
    author: "Daniel Vassallo",
    cover: "/books/covers/TheGoodPartsOfAWS.jpg",
    pdf: "https://drive.google.com/uc?export=download&id=1vzg9VJFHzT6RYvH5JT-KlNsmUVMl2mu4",
    desc: "This is not your typical reference book. It doesn't cover all of AWS or all its quirks. Instead, we want to help you realize which AWS features you’d be foolish not to use. Features for which you almost never need to consider alternatives. Features that have passed the test of time by being at the backbone of most things on the internet.",
    tag: "DevOps", tagColor: "#00d2be",
    pages: "176",
  },
  frontend: {
    title: "Frontend Guide",
    author: "TSU MoreIT",
    cover: "/books/covers/frontend.png",
    pdf: "/books/pdfs/frontend.pdf",
    desc: "HTML, CSS, JavaScript და React",
    tag: "Frontend", tagColor: "#5b5bff",
    pages: "180",
  },
  backend: {
    title: "Backend with C#",
    author: "TSU MoreIT",
    cover: "/books/covers/backend.png",
    pdf: "/books/pdfs/backend.pdf",
    desc: "C# და ASP.NET Core საფუძვლები",
    tag: "Backend", tagColor: "#f59e0b",
    pages: "160",
  },
};

export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books[id];

  useEffect(() => {
    document.title = book ? `MoreIT | ${book.title}` : "MoreIT | 404";
  }, [id]);

  if (!book) return (
    <div className="page center">
      <h1 className="page-title">[ 404 ]</h1>
      <button className="btn" style={{ width: "auto", marginTop: 24 }} onClick={() => navigate("/books")}>
        &#9664; BACK
      </button>
    </div>
  );

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/books")}>&#9664; BACK</button>

      <div className="book-detail">
        <div className="book-detail-cover">
          <img src={book.cover} alt={book.title} className="book-cover-img-lg"
            onError={e => { e.target.style.display = "none"; }}
          />
          <div className="book-cover-fallback-lg">
            <span className="book-cover-title-lg"></span>
          </div>
        </div>

        <div className="book-detail-info">
          <span className="book-tag" style={{ color: book.tagColor }}>&#9900; {book.tag}</span>
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-desc">{book.desc}</p>

          <div className="book-meta">
            <div className="book-meta-row">
              <span className="profile-key">&#9632; AUTHOR</span>
              <span className="profile-val">{book.author}</span>
            </div>
            <div className="book-meta-row">
              <span className="profile-key">&#9632; PAGES</span>
              <span className="profile-val">{book.pages}</span>
            </div>
            <div className="book-meta-row">
              <span className="profile-key">&#9632; FORMAT</span>
              <span className="profile-val">PDF</span>
            </div>
          </div>

          <a href={book.pdf} download className="btn download-btn">
            &#9660; DOWNLOAD PDF
          </a>
        </div>
      </div>
    </div>
  );
}