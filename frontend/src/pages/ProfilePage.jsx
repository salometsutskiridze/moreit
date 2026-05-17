import { useEffect } from "react";

export default function ProfilePage({ user }) {

  useEffect(() => {
  document.title = "MoreIT | Your Profile"; // შეცვალე სახელი
}, []);

  return (
    <div className="page center">
      <h1 className="page-title">[ PROFILE ]</h1>
      <p className="page-sub">// კონტენტი მალე დაემატება</p>
    </div>
  );
}