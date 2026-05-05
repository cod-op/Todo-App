# 📝 Modern MERN Todo Application

Ek lightweight aur high-performance **Full-Stack Task Management Application**. Is project ka main focus **Secure Authentication**, **Clean UI**, aur **Optimized React State Management** par hai.

## 🔗 Project Links
- **Live Demo:** [Todo App on Render](https://todo-app-frontend-4u8e.onrender.com/)
- **Source Code:** [GitHub Repository](https://github.com/cod-op/Todo-App)

---

## ✨ Features
- **🔐 User Authentication:** JWT-based Register aur Login functionality (Secure Password Hashing ke sath).
- **📝 Task Management:** User-specific tasks ko create, update aur delete karne ki facility.
- **🛡️ Protected Routes:** Sirf authenticated users hi apne dashboard aur tasks ko access kar sakte hain.
- **🎨 Pure CSS Styling:** Bina kisi framework (Bootstrap/Tailwind) ke, custom CSS se banaya gaya modern aur minimal design.
- **💾 Data Persistence:** MongoDB ka use karke data ko permanently save kiya gaya hai.
- **📱 Responsive Design:** Mobile, Tablet aur Desktop screens ke liye fully optimized layout.

## 🛠 Tech Stack
- **Frontend:** React.js (Vite) & Axios
- **Backend:** Node.js & Express.js
- **Database:** MongoDB Atlas
- **Security:** JSON Web Tokens (JWT) & BcryptJS
- **Styling:** Custom CSS3 (Flexbox & Grid)
- **Deployment:** Render
- **Version Control:** Git & GitHub

---

## 📡 API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/register` | User registration ke liye | ❌ |
| `POST` | `/api/login` | User login aur token generation ke liye | ❌ |
| `POST` | `/api/create` | Naya task create karne ke liye | ✅ |
| `POST` | `/api/getAll/:userId` | User-specific saare tasks fetch karne ke liye | ✅ |
| `PATCH` | `/api/update/:id` | Task status/content update karne ke liye | ✅ |
| `DELETE` | `/api/delete/:id` | Task ko database se remove karne ke liye | ✅ |


