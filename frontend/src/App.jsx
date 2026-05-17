import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Navbar         from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage       from "./pages/AuthPage";
import HomePage       from "./pages/HomePage";
import CoursesPage    from "./pages/CoursesPage";
import CoursePage     from "./pages/CoursePage";
import ContactPage    from "./pages/ContactPage";
import ProfilePage    from "./pages/ProfilePage";
import NotFoundPage   from "./pages/NotFoundPage";

import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  const cursor = useRef();

  useEffect(() => {
    const move  = (e) => {
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
        <Navbar user={user} onLogout={() => setUser(null)} />
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/login"       element={<AuthPage onLogin={setUser} />} />
          <Route path="/courses"     element={<CoursesPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/courses/:id" element={
            <ProtectedRoute user={user}>
              <CoursePage />
            </ProtectedRoute>
          } />
          <Route path="/profile"     element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user} />
            </ProtectedRoute>
          } />
          <Route path="*"            element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}