import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ user, onLogout }) {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const active = (path) => pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      {/* <Link to="/" className="nav-brand">MoreIT</Link> */}
      <Link to="/" className="nav-brand">
      <img src="/logo.png" alt="MoreIT" className="nav-logo" />
        MoreIT
      </Link>
      <div className="nav-links">
        <Link to="/"        className={active("/")}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>HOME</Link>
        <Link to="/courses" className={active("/courses")}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>COURSES</Link>
        <Link to="/contact" className={active("/contact")}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>CONTACT</Link>
        <Link to="/profile" className={active("/profile")}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>PROFILE</Link>
      </div>

      <div className="nav-auth">
        <button className="theme-btn" onClick={toggle}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
        {user
          ? <button className="btn small" onClick={onLogout}>LOGOUT</button>
          : <Link to="/login"><button className="btn small">LOGIN</button></Link>
        }
      </div>
    </nav>
  );
}