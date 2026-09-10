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
  AdvancedJavascriptUnleashed: {
    title: "Advanced Javascript Unleashed",
    author: "newline",
    cover: "/books/covers/AdvancedJavascriptUnleashed.jpg",
    pdf: "https://drive.google.com/uc?export=download&id=1OJRaA6E5cfFksZIcvYIfsVpazt0fzK4A",
    desc: "This course aims to teach different concepts in JavaScript that are not easy to grasp, especially for beginners. Topics like closures, coercion, the asynchronous nature of JavaScript, etc., are examples of topics that most beginners struggle with because they are not easy to understand. The goal of this course is to provide in-depth, easy-to-understand explanations of such confusing topics.",
    tag: "Frontend", tagColor: "#5b5bff",
    pages: "234",
  },
  ModernCssForBetterUX: {
    title: "Modern CSS For Better User Experience",
    author: "Victor Ponamariov",
    cover: "/books/covers/ModernCssForBetterUserExperience.png",
    pdf: "https://drive.google.com/uc?export=download&id=1_0tbp5obIRg7CpDSGZrE0_foYKCeGmN-",
    desc: "The book 'Modern CSS: Crafting a Better User Experience' helps you understand the current capabilities of CSS and how to apply them in real frontend projects. You will see how modern CSS tools solve problems that were previously often addressed with JavaScript libraries, complex hacks, or excessive frameworks.",
    tag: "Frontend", tagColor: "#5b5bff",
    pages: "162",
  },
  BuildingADatabaseEngine: {
    title: "Building A Database Engine",
    author: "Martin Joo",
    cover: "/books/covers/BuildingADatabaseEngine.png",
    pdf: "https://drive.google.com/uc?export=download&id=159Di9LW-94a-mL_5xB7Lh9wFqkbLAvid",
    desc: "The book 'Building a Database Engine' is a practical guide to creating your own database engine from scratch. It is intended for developers looking to deepen their knowledge in the area of systems programming and database architecture.",
    tag: "Backend", tagColor: "#f59e0b",
    pages: "133",
  },
  BunSecurityEssentials: {
    title: "Bun Security Essentials",
    author: "Liran Tal",
    cover: "/books/covers/BunSecurityEssentials.png",
    pdf: "https://drive.google.com/uc?export=download&id=1OqfRvHC5OCfkEM6tuetCllQiKJyfGMk_",
    desc: "The material covers all levels of Bun security: from analyzing the environment's architecture to assessing supply chain threats. The author examines common design errors, potential attack vectors, and practical protection methods that allow developers to build robust server logic. Special attention is given to examples from real development scenarios, analysis of vulnerable code fragments, and explanation of common exploitation techniques associated with the Bun environment.",
    tag: "Universal", tagColor: "#adbe2c",
    pages: "69",
  },
  SeniorEngineerMindset: {
    title: "Senior Engineer Mindset",
    author: "Swizec Teller",
    cover: "/books/covers/SeniorEngineerMindset.png",
    pdf: "https://drive.google.com/uc?export=download&id=1PvRjbtF7EU-Biyyqz5fzuldhvXNjOf59",
    desc: "The Senior Engineer Mindset ebook is a 255 page collection of essays from my time in Silicon Valley. You can binge the pdf/epub/mobi, or wait for each chapter to hit your inbox.",
    tag: "Universal", tagColor: "#adbe2c",
    pages: "255",
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