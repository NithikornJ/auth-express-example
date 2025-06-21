# Authentication Demo — Login ด้วย 3 วิธีหลัก (Token, Cookie, Session)

โปรเจกต์นี้เป็นตัวอย่างการทำระบบ Authentication ด้วย 3 วิธีหลัก ที่ใช้กันในเว็บแอปจริง  
ซึ่งเรียนรู้จากคลิป YouTube และบทความบล็อกของ Mikelopster

---

## 🎯 จุดประสงค์โปรเจกต์

- ทดลองสร้างระบบ Login ด้วยวิธีต่าง ๆ  
- เข้าใจหลักการทำงานของ Authentication แต่ละแบบ  
- เปรียบเทียบข้อดีข้อเสียของแต่ละวิธี  
- ลงมือทำตั้งแต่ฝั่ง Backend API จนถึง Frontend ทดสอบการใช้งาน

---

## 📚 วิธี Authentication ที่ทำในโปรเจกต์นี้

### 1. Token-based Authentication (JWT)

- Backend สร้าง JWT token ส่งกลับไปให้ Frontend  
- Frontend เก็บ token ใน LocalStorage หรือ Memory  
- ส่ง token แนบใน header `Authorization: Bearer <token>` ทุกครั้งเมื่อเรียก API  
- ข้อดี: ยืดหยุ่น, ใช้ได้กับแอปหลายแพลตฟอร์ม  
- ข้อเสีย: เสี่ยง XSS, token อ่านได้ถ้าโดนขโมย

### 2. Cookie-based Authentication

- Backend ส่ง token กลับใน HTTP-only Cookie  
- Browser จัดการส่ง cookie อัตโนมัติทุก request  
- ข้อดี: ปลอดภัยกว่าเพราะ cookie ไม่เข้าถึงด้วย JavaScript  
- ข้อเสีย: ขนาด cookie จำกัด, เสี่ยง CSRF ต้องป้องกันเพิ่ม

### 3. Session-based Authentication

- Backend สร้าง session บน server แล้วส่ง session ID ใน cookie  
- ข้อมูล session เก็บไว้บน server (Memory, DB, Redis)  
- Client ใช้ cookie อ้างอิง session ID เพื่อยืนยันตัวตน  
- ข้อดี: ปลอดภัยมาก, เก็บข้อมูลขนาดใหญ่ได้  
- ข้อเสีย: ต้องจัดการ session lifecycle และโหลด server เพิ่ม

---

## 🛠 เทคโนโลยีที่ใช้

- Node.js  
- Express.js  
- JSON Web Token (jsonwebtoken)  
- express-session  
- cookie-parser  
- bcrypt   
- Mysql

---
อ้างอิง
คลิป YouTube: มาลองทำ Login ด้วย Authentication แต่ละแบบกัน
https://www.youtube.com/watch?v=JhNxzPHipbY&ab_channel=mikelopster
อ่านฉบับบทความได้ที่
https://blog.mikelopster.dev/auth-express

