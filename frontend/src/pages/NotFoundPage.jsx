import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
  document.title = "MoreIT | 404 Page Not Found "; // შეცვალე სახელი
}, []);

  return (
    
    <div className="page center">
      <h1 className="page-title">[ 404 ]</h1>
      <p className="page-sub">გვერდი ვერ მოიძებნა</p>
      <button className="btn" style={{ marginTop: 24 }} onClick={() => navigate("/")}>
        &#9664; HOME
      </button>
    </div>
    
  );
}