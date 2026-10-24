# MiniShop

MiniShop แบบหลายหน้า สร้างด้วย Vite + React + TypeScript + Tailwind CSS v4 + React Router v6

```bash
yarn install
yarn api   # Mock REST API (JSON Server) ที่ http://localhost:3001
yarn dev   # React ที่ http://localhost:5173
```

## Routes

| URL | หน้า |
| --- | --- |
| `/` | Home: ชื่อร้าน สินค้าแนะนำ |
| `/dashboard` | Dashboard |
| `/products` | รายการสินค้า ค้นหา กรองหมวดหมู่ และเรียงราคา |
| `/products/:id` | รายละเอียดสินค้าตาม ID ใน URL |
| `/admin/products` | Product Management: เพิ่ม แก้ไข ลบสินค้าผ่าน REST API (ต้องรัน `yarn api`) |
| `/about` | ข้อมูลร้าน |
| `/profile` | Profile |
| อื่น ๆ | 404 Not Found |

## MVC Thinking

- **Model** `src/models/productModel.ts` ดึงข้อมูลสินค้าจาก API และหาสินค้าจาก ID
- **View** `src/pages/`, `src/components/` แสดงผลด้วย JSX และ Tailwind CSS
- **Controller** `src/hooks/useProducts.ts` กับ event handler ในแต่ละหน้า เช่น อ่าน ID จาก URL แล้วสั่งเปลี่ยนหน้า

## Link, useNavigate() และ useParams() ต่างกันอย่างไร

- **`<Link>`** เป็น component ที่แสดงเป็นลิงก์ ผู้ใช้คลิกแล้วเปลี่ยนหน้าโดยไม่โหลดเว็บใหม่ ใช้เมื่อรู้ปลายทางตั้งแต่ตอนแสดงผล เช่น `<Link to="/products/1">View Detail</Link>` (`<NavLink>` คือ Link ที่รู้ว่าตัวเองตรงกับ URL ปัจจุบันหรือไม่ จึงใช้ทำเมนูที่ไฮไลต์หน้าปัจจุบันได้)
- **`useNavigate()`** เป็น hook ที่คืนฟังก์ชันสำหรับเปลี่ยนหน้าจากโค้ด JavaScript ใช้เมื่อต้องเปลี่ยนหน้าหลังเกิดเหตุการณ์ เช่น กดปุ่ม Continue Shopping แล้วเรียก `navigate("/products")`
- **`useParams()`** ไม่ได้เปลี่ยนหน้า แต่ใช้อ่านค่าที่อยู่ใน URL ตาม pattern ของ Route เช่น Route `/products/:id` เมื่อเปิด `/products/3` จะได้ `id` เป็น string `"3"` จึงต้องแปลงเป็นตัวเลขก่อนนำไปหาสินค้า

สรุป: Link และ useNavigate ใช้ "ไป" หน้าอื่น (Link ให้ผู้ใช้คลิก, useNavigate สั่งจากโค้ด) ส่วน useParams ใช้ "อ่าน" ข้อมูลจาก URL ของหน้าปัจจุบัน
