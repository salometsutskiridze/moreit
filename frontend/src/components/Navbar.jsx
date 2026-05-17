import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const { pathname } = useLocation();
  const active = (path) => pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">MoreIT</Link>

      <div className="nav-links">
        <Link to="/"        className={active("/")}>HOME</Link>
        <Link to="/courses" className={active("/courses")}>COURSES</Link>
        <Link to="/contact" className={active("/contact")}>CONTACT</Link>
        <Link to="/profile" className={active("/profile")}>PROFILE</Link>
      </div>

      <div className="nav-auth">
        {user
          ? <button className="btn small" onClick={onLogout}>LOGOUT</button>
          : <Link to="/login"><button className="btn small">LOGIN</button></Link>
        }
      </div>
    </nav>
  );
}
