import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Navbar         from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast          from "./components/Toast";
import AuthPage       from "./pages/AuthPage";
import HomePage       from "./pages/HomePage";
import CoursesPage    from "./pages/CoursesPage";
import CoursePage     from "./pages/CoursePage";
import ContactPage    from "./pages/ContactPage";
import ProfilePage    from "./pages/ProfilePage";
import NotFoundPage   from "./pages/NotFoundPage";
import BooksPage      from "./pages/BooksPage";
import BookPage       from "./pages/BookPage";

import "./index.css";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("moreit_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [toast, setToast] = useState(null);
  const cursor = useRef();

  const showToast = (msg) => setToast(msg);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem("moreit_user");
    setUser(null);
  }

  useEffect(() => {
    const move = (e) => {
      cursor.current.style.left = e.clientX - 6 + "px";
      cursor.current.style.top  = e.clientY - 6 + "px";
    };
    const down = () => cursor.current.classList.add("clicked");
    const up   = () => cursor.current.classList.remove("clicked");
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursor} />
      <BrowserRouter>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/login"       element={<AuthPage onLogin={handleLogin} showToast={showToast} />} />
          <Route path="/courses"     element={<CoursesPage user={user} showToast={showToast} />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/courses/:id" element={
            <ProtectedRoute user={user} showToast={showToast} msg="კურსის სანახავად გაიარეთ აუტორიზაცია">
              <CoursePage />
            </ProtectedRoute>
          } />
          <Route path="/profile"     element={
            <ProtectedRoute user={user} showToast={showToast} msg="პროფილის სანახავად გაიარეთ აუტორიზაცია">
              <ProfilePage user={user} />
            </ProtectedRoute>
          } />
          <Route path="/books"       element={
            <ProtectedRoute user={user} showToast={showToast} msg="წიგნების სანახავად გაიარეთ აუტორიზაცია">
              <BooksPage />
            </ProtectedRoute>
          } />
          <Route path="/books/:id"   element={
            <ProtectedRoute user={user} showToast={showToast} msg="წიგნის სანახავად გაიარეთ აუტორიზაცია">
              <BookPage />
            </ProtectedRoute>
          } />
          <Route path="*"            element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}