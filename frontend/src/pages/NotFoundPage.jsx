import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
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