import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const isRegister = activeTab === "register";

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isRegister
      ? "http://localhost:3001/api/v2/users"
      : "http://localhost:3001/api/v2/users/login";
    const body = isRegister
      ? { username: form.username, email: form.email, password: form.password }
      : { email: form.email, password: form.password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }

      if (isRegister) {
        setMessage("Account created. You can log in now.");
        setActiveTab("login");
        setForm({ username: "", email: form.email, password: "" });
      } else {
        setAccount(data.user);
        setIsLoggedIn(true);
        setMessage("");
      }
    } catch {
      setMessage("Cannot connect to backend");
    }
  };

  const showRegister = () => {
    setIsLoggedIn(false);
    setActiveTab("register");
    setForm({ username: "", email: "", password: "" });
    setMessage("");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setActiveTab("login");
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <main className="app-shell">
      {isLoggedIn ? (
        <section className="welcome-panel">
          <span className="eyebrow">You are signed in</span>
          <h1>Good to see you, {account.username}.</h1>
          <p>Your local account is ready. This is the place where your app content will live.</p>
          <div className="welcome-actions">
            <button className="button button-primary" type="button" onClick={logOut}>Log out</button>
            <button className="button button-quiet" type="button" onClick={showRegister}>Create a new account</button>
          </div>
        </section>
      ) : (
        <section className="auth-layout">
          <div className="intro-panel">
            <span className="eyebrow">A calmer way forward</span>
            <h1>Make room for what matters.</h1>
            <p>Set up your personal workspace and keep your next steps close at hand.</p>
            <div className="intro-note">
              <span className="note-icon">✦</span>
              <span>Simple now. Ready for your API later.</span>
            </div>
          </div>

          <div className="auth-card">
            <div className="card-heading">
              <h2>{isRegister ? "Create your account" : "Welcome back"}</h2>
              {!isRegister && <p>Log in to continue to your workspace.</p>}
            </div>
            <div className="tabs" role="tablist" aria-label="Authentication options">
              <button className={isRegister ? "tab active" : "tab"} type="button" role="tab" aria-selected={isRegister} onClick={() => { setActiveTab("register"); setMessage(""); }}>Register</button>
              <button className={!isRegister ? "tab active" : "tab"} type="button" role="tab" aria-selected={!isRegister} onClick={() => { setActiveTab("login"); setMessage(""); }}>Login</button>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister && (
                <label>Username<input name="username" type="text" value={form.username} onChange={handleChange} placeholder="input username" required /></label>
              )}
              <label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required /></label>
              <label>Password<input name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" minLength="8" required /></label>
              {message && <p className={message.startsWith("Account") ? "form-message success" : "form-message"}>{message}</p>}
              <button className="button button-primary submit-button" type="submit">{isRegister ? "Create account" : "Log in"} <span aria-hidden="true">↗</span></button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
