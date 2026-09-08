import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, showToast, msg, children }) {
  useEffect(() => {
    if (!user) showToast(msg);
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  return children;
}