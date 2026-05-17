import { useState } from "react";
import { useNavigate } from "react-router-dom";

function validate(fields) {
  const e = {};
  if ("name" in fields && !fields.name)  e.name = "> NAME IS REQUIRED";
  if (!fields.email)                     e.email = "> EMAIL IS REQUIRED";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "> INVALID EMAIL FORMAT";
  if (!fields.password)                  e.password = "> PASSWORD IS REQUIRED";
  else if (fields.password.length < 6)   e.password = "> MIN 6 CHARACTERS";
  return e;
}

export default function AuthPage({ onLogin }) {
  const [tab, setTab]     = useState("login");
  const [form, setForm]   = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  function submit() {
    const fields = tab === "login" ? { email: form.email, password: form.password } : form;
    const e = validate(fields);
    if (Object.keys(e).length) { setErrors(e); return; }
    onLogin({ email: form.email, name: form.name || form.email.split("@")[0] });
    navigate("/courses");
  }

  return (
    <div className="page center">
      <div className="card">
        <div className="logo">
          <div className="logo-box">MoreIT</div>
          <span className="logo-sub">KNOWLEDGE FOR FREE</span>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>LOGIN</button>
          <button className={`tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>REGISTER</button>
        </div>

        {tab === "register" && (
          <>
            <label>NAME</label>
            <input value={form.name} placeholder="eliot" onChange={e => set("name", e.target.value)} className={errors.name ? "invalid" : ""} />
            {errors.name && <span className="err">{errors.name}</span>}
          </>
        )}

        <label>EMAIL</label>
        <input type="email" value={form.email} placeholder="you@mail.com" onChange={e => set("email", e.target.value)} className={errors.email ? "invalid" : ""} />
        {errors.email && <span className="err">{errors.email}</span>}

        <label>PASSWORD</label>
        <input type="password" value={form.password} placeholder="••••••••" onChange={e => set("password", e.target.value)} className={errors.password ? "invalid" : ""} />
        {errors.password && <span className="err">{errors.password}</span>}

        <button className="btn" onClick={submit}>
          &#9654; {tab === "login" ? "ENTER" : "CREATE ACCOUNT"}
        </button>

        <p className="switch">
          {tab === "login"
            ? <>DON'T HAVE ACCOUNT? <a onClick={() => setTab("register")}>REGISTER</a></>
            : <>ALREADY HAVE ACCOUNT? <a onClick={() => setTab("login")}>LOGIN</a></>
          }
        </p>
      </div>
    </div>
  );
}
