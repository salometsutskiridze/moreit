import { useState, useEffect } from "react";
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

export default function AuthPage({ onLogin, showToast }) {
  const [tab, setTab]           = useState("login");
  const [form, setForm]         = useState({ name: "", email: "", password: "" });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [step, setStep]         = useState("form");
  const [code, setCode]         = useState("");
  const [codeErr, setCodeErr]   = useState("");
  const navigate = useNavigate();

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  useEffect(() => {
    document.title = "MoreIT | Authorization Page";
  }, []);

  function submit() {
    const fields = tab === "login" ? { email: form.email, password: form.password } : form;
    const e = validate(fields);
    if (Object.keys(e).length) { setErrors(e); return; }

    if (tab === "login") {
      const userData = { email: form.email, name: form.email.split("@")[0] };
      localStorage.setItem("moreit_joindate", new Date().toLocaleDateString("ka-GE"));
      if (remember) localStorage.setItem("moreit_user", JSON.stringify(userData));
      onLogin(userData);
      showToast("წარმატებით გაიარეთ აუტორიზაცია ✓");
      navigate("/courses");
    } else {
      setStep("verify");
    }
  }

  function verifyCode() {
    if (code.length !== 6) { setCodeErr("> 6-DIGIT CODE IS REQUIRED"); return; }
    const userData = { email: form.email, name: form.name };
    localStorage.setItem("moreit_joindate", new Date().toLocaleDateString("ka-GE"));
    if (remember) localStorage.setItem("moreit_user", JSON.stringify(userData));
    onLogin(userData);
    showToast("წარმატებით დარეგისტრირდი ✓");
    navigate("/courses");
  }

  return (
    <div className="page center">
      <div className="card">
        <div className="logo">
          <div className="logo-row">
            <img src="/logo.png" alt="MoreIT" className="auth-logo" />
            <div className="logo-box">MoreIT</div>
          </div>
          <span className="logo-sub">KNOWLEDGE FOR FREE</span>
        </div>

        {step === "verify" ? (
          <>
            <div className="verify-header">
              <p className="verify-title">[ VERIFY EMAIL ]</p>
              <p className="verify-sub">კოდი გამოგეგზავნა:</p>
              <p className="verify-email">{form.email}</p>
            </div>

            <label>6-DIGIT CODE</label>
            <input
              type="text"
              maxLength={6}
              value={code}
              placeholder="000000"
              className={codeErr ? "invalid" : ""}
              onChange={e => { setCode(e.target.value); setCodeErr(""); }}
            />
            {codeErr && <span className="err">{codeErr}</span>}

            <button className="btn" onClick={verifyCode}>
              &#9654; VERIFY
            </button>

            <p className="switch">
              <a onClick={() => setStep("form")}>&#9664; BACK</a>
            </p>
          </>
        ) : (
          <>
            <div className="tabs">
              <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>LOGIN</button>
              <button className={`tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>REGISTER</button>
            </div>

            {tab === "register" && (
              <>
                <label>სახელი</label>
                <input
                  value={form.name}
                  placeholder="eliot"
                  onChange={e => set("name", e.target.value)}
                  className={errors.name ? "invalid" : ""}
                />
                {errors.name && <span className="err">{errors.name}</span>}
              </>
            )}

            <label>EMAIL</label>
            <input
              type="email"
              value={form.email}
              placeholder="you@mail.com"
              onChange={e => set("email", e.target.value)}
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && <span className="err">{errors.email}</span>}

            <label>პაროლი</label>
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              placeholder="••••••••"
              onChange={e => set("password", e.target.value)}
              className={errors.password ? "invalid" : ""}
            />
            {errors.password && <span className="err">{errors.password}</span>}

            <label className="show-pass-label" onClick={() => setShowPass(p => !p)}>
              <div className={`box ${showPass ? "checked" : ""}`} />
              SHOW PASSWORD
            </label>

            <label className="show-pass-label" onClick={() => setRemember(p => !p)}>
              <div className={`box ${remember ? "checked" : ""}`} />
              REMEMBER ME
            </label>

            <button className="btn" onClick={submit}>
              &#9654; {tab === "login" ? "ENTER" : "CREATE ACCOUNT"}
            </button>

            <p className="switch">
              {tab === "login"
                ? <>არ გაქვს ანგარიში? <a onClick={() => setTab("register")}>REGISTER</a></>
                : <>უკვე გაქვს ანგარიში? <a onClick={() => setTab("login")}>LOGIN</a></>
              }
            </p>
          </>
        )}
      </div>
    </div>
  );
}