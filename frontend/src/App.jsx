import { useState } from "react";
import "./App.css";

function App() {
<<<<<<< HEAD
  // 1. สร้าง State สำหรับเก็บข้อมูลในฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // ฟังก์ชั่นอัปเดตค่าใน State เมื่อมีการพิมพ์
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 2. ฟังก์ชั่นจัดการการ Submit ฟอร์มด้วย POST Method
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ รีเฟรช ตัวเอง

    try {
      // เปลี่ยน URL นี้เป็น API Endpoint ของคุณ
      const response = await fetch('https://api.example.com/register', {
        method: 'POST', // ระบุ Method
        headers: {
          'Content-Type': 'application/json', // บอกเซิร์ฟเวอร์ว่าเราส่งข้อมูลประเภท JSON
        },
        body: JSON.stringify(formData), // แปลง JS Object ให้เป็น JSON String
      });

      if (response.ok) {
        const result = await response.json();
        console.log('ส่งข้อมูลสำเร็จ:', result);
        alert('ลงทะเบียนสำเร็จ!');
      } else {
        console.error('เกิดข้อผิดพลาดจากเซิร์ฟเวอร์');
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* ใส่ onSubmit ที่ตัวแท็ก <form> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-4 rounded mt-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
=======
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
      ? {
          username: form.username,
          email: form.email,
          password: form.password,
        }
      : {
          email: form.email,
          password: form.password,
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        setForm({
          username: "",
          email: form.email,
          password: "",
        });
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
          <p>
            Your local account is ready. This is the place where your app
            content will live.
          </p>
          <div className="welcome-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={logOut}
            >
              Log out
            </button>
            <button
              className="button button-quiet"
              type="button"
              onClick={showRegister}
            >
              Create a new account
            </button>
          </div>
        </section>
      ) : (
        <section className="auth-layout">
          <div className="intro-panel">
            <span className="eyebrow">A calmer way forward</span>
            <h1>Make room for what matters.</h1>
            <p>
              Set up your personal workspace and keep your next steps close at
              hand.
            </p>
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
            <div
              className="tabs"
              role="tablist"
              aria-label="Authentication options"
            >
              <button
                className={isRegister ? "tab active" : "tab"}
                type="button"
                role="tab"
                aria-selected={isRegister}
                onClick={() => {
                  setActiveTab("register");
                  setMessage("");
                }}
              >
                Register
              </button>
              <button
                className={!isRegister ? "tab active" : "tab"}
                type="button"
                role="tab"
                aria-selected={!isRegister}
                onClick={() => {
                  setActiveTab("login");
                  setMessage("");
                }}
              >
                Login
              </button>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister && (
                <label>
                  Username
                  <input
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="input username"
                    required
                  />
                </label>
              )}
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  minLength="8"
                  required
                />
              </label>
              {message && (
                <p
                  className={
                    message.startsWith("Account")
                      ? "form-message success"
                      : "form-message"
                  }
                >
                  {message}
                </p>
              )}
              <button
                className="button button-primary submit-button"
                type="submit"
              >
                {isRegister ? "Create account" : "Log in"}{" "}
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
>>>>>>> 45d42db1ce31040ca5e3ad415ac3bfd66a239f48
  );
}

export default App;
