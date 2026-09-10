import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
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
  );
}

export default App
