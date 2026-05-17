import { useEffect } from "react";

export default function ContactPage() {

  useEffect(() => {
  document.title = "MoreIT | Contact Info"; // შეცვალე სახელი
}, []);

  return (
    <div className="page center">
      <h1 className="page-title">[ CONTACT ]</h1>
      <p className="page-sub">// კონტენტი მალე დაემატება</p>
    </div>
  );
}