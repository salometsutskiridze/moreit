import { useState, useEffect } from "react";

const COOLDOWN = 10 * 60 * 1000; // 10 წუთი ms-ში

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [sent, setSent]       = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  useEffect(() => {
    document.title = "MoreIT | Contact";

    // შეამოწმე localStorage-ში cooldown
    const last = localStorage.getItem("lastMessage");
    if (last) {
      const remaining = COOLDOWN - (Date.now() - parseInt(last));
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  // countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(c => {
        if (c <= 1000) { clearInterval(timer); return 0; }
        return c - 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function formatTime(ms) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function validate() {
    const e = {};
    if (!form.name)                                           e.name    = "> NAME IS REQUIRED";
    if (!form.email)                                          e.email   = "> EMAIL IS REQUIRED";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = "> INVALID EMAIL FORMAT";
    if (!form.message)                                        e.message = "> MESSAGE IS REQUIRED";
    return e;
  }

  function submit() {
    if (cooldown > 0) return;
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    localStorage.setItem("lastMessage", Date.now().toString());
    setCooldown(COOLDOWN);
    setSent(true);
  }

  return (
    <div className="page">
      <h1 className="page-title">[ CONTACT ]</h1>
      <p className="page-sub">დაგვიკავშირდი</p>

      <div className="section-box" style={{ marginBottom: 32 }}>
        <div className="section-title">&#9632; ვინ ვართ?</div>
        <p className="home-text">
          MoreIT არის CS სტუდენტებისთვის შექმნილი პლატფორმა.
          ნებისმიერი კითხვის, წინადადების ან თანამშრომლობის შემთხვევაში დაგვიკავშირდი.
        </p>
        <div style={{ marginTop: 20 }}>
          <p className="contact-info-line">[ EMAIL : supportmoreit@gmail.com ]</p>
        </div>
      </div>

      {sent ? (
        <div className="section-box">
          <div className="section-title">&#9632; გაიგზავნა! ✓</div>
          <p className="home-text">მალე დაგიკავშირდებით.</p>
          {cooldown > 0 && (
            <p className="cooldown-text">
              &#9632; შემდეგი შეტყობინება: {formatTime(cooldown)}
            </p>
          )}
        </div>
      ) : (
        <div className="section-box">
          <div className="section-title">&#9632; შეტყობინება</div>

          <label>NAME</label>
          <input
            type="text"
            value={form.name}
            placeholder="შენი სახელი"
            className={errors.name ? "invalid" : ""}
            onChange={e => set("name", e.target.value)}
          />
          {errors.name && <span className="err">{errors.name}</span>}

          <label>EMAIL</label>
          <input
            type="email"
            value={form.email}
            placeholder="you@mail.com"
            className={errors.email ? "invalid" : ""}
            onChange={e => set("email", e.target.value)}
          />
          {errors.email && <span className="err">{errors.email}</span>}

          <label>MESSAGE</label>
          <textarea
            value={form.message}
            placeholder="შეტყობინება..."
            className={errors.message ? "invalid" : ""}
            onChange={e => set("message", e.target.value)}
          />
          {errors.message && <span className="err">{errors.message}</span>}

          <button className="btn" onClick={submit} disabled={cooldown > 0}>
            {cooldown > 0
              ? `WAIT ${formatTime(cooldown)}`
              : "SEND MESSAGE"
            }
            </button>

          {cooldown > 0 && (
            <p className="cooldown-text">
              &#9632; შემდეგი შეტყობინება: {formatTime(cooldown)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}