import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
  document.title = "MoreIT | Learn More About IT"; // შეცვალე სახელი
}, []);

  return (
    <div className="page center">
      <h1 className="page-title">[ MoreIT ]</h1>
      <p className="page-sub">IT კარიერის პლატფორმა ყველასთვის</p>
    </div>
  );
}