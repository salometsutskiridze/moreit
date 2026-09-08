import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="toast">
      &#9632; {message}
    </div>
  );
}