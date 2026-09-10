import { Router } from "express";
import { supabase } from "../../config/supabase.js";

const router = Router();
const PG_SELECT = "id, username, email, role, created_at, updated_at"
// READ users
router.get("/pg", async (req, res, next) => {
  try {
    const {data, error} = await supabase.from("users").select(PG_SELECT);
    if(error) throw error;

    return res.status(200).json({success: true, data})
    
  } catch (err) {
    next(err);
  }
});

// CREATE users
// สร้าง route สำหรับรับ request แบบ POST ที่ path /pg
router.post("/pg", async (req, res, next) => {
  // เริ่ม block สำหรับดักจับ error ที่อาจเกิดขึ้น
  try {
    // ดึง username, email และ password จาก request body
    const { username, email, password } = req.body;

    // ตรวจสอบว่าผู้ใช้ส่งข้อมูลที่จำเป็นมาครบหรือไม่
    if (!username || !email || !password) {
      // ถ้าข้อมูลไม่ครบ ให้ตอบกลับด้วยสถานะ 400 Bad Request
      return res.status(400).json({
        // ส่งข้อความแจ้งว่าต้องระบุข้อมูลทั้งสามฟิลด์
        error: "username, email and password are required",
      });
    }

    // เรียกใช้งาน Supabase และรอผลลัพธ์จากฐานข้อมูล
    const { data, error } = await supabase
      // เลือกตาราง users เป็นตารางเป้าหมาย
      .from("users")
      // เพิ่ม user ใหม่ลงในตาราง users
      .insert({ username, email, password })
      // เลือกเฉพาะคอลัมน์ที่ระบุไว้ใน PG_SELECT เพื่อส่งกลับ
      .select(PG_SELECT)
      // คาดหวังผลลัพธ์กลับมาเพียงหนึ่งแถว
      .single();

    // ถ้า Supabase ส่ง error กลับมา ให้ส่งต่อไปยัง catch
    if (error) throw error;

    // ตอบกลับด้วยสถานะ 201 Created พร้อมข้อมูล user ที่สร้างสำเร็จ
    return res.status(201).json({ success: true, data });
  // จบ block try และเริ่มจัดการ error
  } catch (err) {
    // ส่ง error ไปยัง error-handling middleware ของ Express
    next(err);
  }
// จบการประกาศ route POST
});

// Update users
router.put("/pg/:id", async (req, res, next) => {
  try {
        if (!req.params.id) {
      return res.status(400).json({ error: "User id is required" });
    }
       // ดึง username, email และ password จาก request body
    const { username, email, password } = req.body;

    // ตรวจสอบว่าผู้ใช้ส่งข้อมูลที่จำเป็นมาครบหรือไม่
    if (!username || !email || !password) {
      // ถ้าข้อมูลไม่ครบ ให้ตอบกลับด้วยสถานะ 400 Bad Request
      return res.status(400).json({
        // ส่งข้อความแจ้งว่าต้องระบุข้อมูลทั้งสามฟิลด์
        error: "username, email and password are required",
      });
    }

    const { data, error } = await supabase
        .from("users")
        .update({username, email, password})
        .eq("id", req.params.id)
        .select(PG_SELECT)
        .maybeSingle();

    if (error) throw error;
        // ถ้าไม่พบ user ที่มี id นี้ ให้ตอบกลับ 404
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: true, data });

  } catch (err) {
    next(err);
  }
});

// Delete users
router.delete("/pg/:id", async (req, res, next) => {
  try {

    // ตรวจสอบว่ามีการส่ง id มาหรือไม่
    if (!req.params.id) {
      return res.status(400).json({ error: "User id is required" });
    }

    // ลบเฉพาะ user ที่มี id ตรงกับค่าที่ส่งมา
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", req.params.id)
      .select(PG_SELECT)
      .maybeSingle();

    // ถ้า Supabase แจ้งข้อผิดพลาด ให้ส่งต่อไปยัง catch
    if (error) throw error;

    // ถ้าไม่พบ user ที่มี id นี้ ให้ตอบกลับ 404
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

    // ตอบกลับเมื่อการลบสำเร็จ พร้อมข้อมูล user ที่ถูกลบ
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
