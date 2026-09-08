import { useEffect, useState, useRef } from "react";

export default function ProfilePage({ user }) {
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    document.title = "MoreIT | Your Profile";
    const saved = localStorage.getItem(`moreit_avatar_${user?.email}`);
    if (saved) setAvatar(saved);
  }, [user]);

  function handleAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      localStorage.setItem(`moreit_avatar_${user?.email}`, ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  const joinDate = localStorage.getItem("moreit_joindate") || new Date().toLocaleDateString("ka-GE");

  return (
    <div className="page">
      <h1 className="page-title">[ PROFILE ]</h1>
      <p className="page-sub">შენი ანგარიში</p>

      <div className="profile-card">

        {/* ── Avatar ── */}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar" onClick={() => fileRef.current.click()}>
            {avatar
              ? <img src={avatar} alt="avatar" className="avatar-img" />
              : <img src="/default-avatar.png" alt="avatar" className="avatar-img" />
            }
            <div className="avatar-overlay">&#9654; CHANGE</div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
        </div>

        {/* ── Info ── */}
        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-key">&#9632; USERNAME</span>
            <span className="profile-val">{user?.name || "PLAYER"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">&#9632; EMAIL</span>
            <span className="profile-val">{user?.email || "—"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">&#9632; JOINED</span>
            <span className="profile-val">{joinDate}</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">&#9632; STATUS</span>
            <span className="profile-val" style={{ color: "#22d3a5" }}>ACTIVE ●</span>
          </div>
        </div>

      </div>
    </div>
  );
}