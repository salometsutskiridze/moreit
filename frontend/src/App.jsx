import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar          from "./components/Navbar";
import ProtectedRoute  from "./components/ProtectedRoute";

import AuthPage        from "./pages/AuthPage";
import HomePage        from "./pages/HomePage";
import CoursesPage     from "./pages/CoursesPage";
import CoursePage      from "./pages/CoursePage";
import ContactPage     from "./pages/ContactPage";
import ProfilePage     from "./pages/ProfilePage";
import NotFoundPage    from "./pages/NotFoundPage";

import "./index.css";

export default function App() {
  const [user, setUser] = useState(null); // null = not logged in

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/login"          element={<AuthPage onLogin={setUser} />} />
        <Route path="/courses"        element={<CoursesPage />} />
        <Route path="/contact"        element={<ContactPage />} />

        {/* Protected — login სავალდებულოა */}
        <Route path="/courses/:id"    element={
          <ProtectedRoute user={user}>
            <CoursePage />
          </ProtectedRoute>
        } />
        <Route path="/profile"        element={
          <ProtectedRoute user={user}>
            <ProfilePage user={user} />
          </ProtectedRoute>
        } />

        <Route path="*"               element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
