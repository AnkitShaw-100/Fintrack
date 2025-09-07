# 💰 Expense Manager (MERN + Vite + TSX)

An **Expense Manager Web App** built with the **MERN stack**, featuring a **Vite + React + TypeScript frontend** and a **Node.js + Express + MongoDB backend**.
The app lets users **track expenses**, manage categories, and **visualize spending trends with Chart.js**.

---

## 🚀 Features

* 🔐 **Authentication** – secure login/signup with JWT & bcrypt
* 💵 **Expense Management** – add, update, delete expenses
* 📊 **Charts & Analytics** – visualize expenses with Chart.js
* 🗂 **Categories & Filtering** – organize expenses better
* 🌐 **RESTful API** – clean and scalable backend
* ⚡ **Vite + TSX frontend** – fast dev environment with TypeScript support

---

## 🛠️ Tech Stack

**Frontend (Vite Project):**

* React + TypeScript (TSX)
* Chart.js
* Axios
* Tailwind CSS (if used)

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JWT + bcrypt (Authentication & Security)
* dotenv (Config management)
* cors (Cross-origin resource sharing)
* nodemon (Dev server)

---

## 📂 Project Structure

```
expense-manager/
│
├── backend/                  # Backend (Node + Express)
│   ├── config/               # DB & config files
│   ├── middlewares/          # Authentication & error handling
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express routes
│   ├── index.js              # Entry point
│   └── package.json
│
├── frontend/ (Vite Project)  # Frontend (React + TSX)
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Dashboard, Login, Signup etc.
│   │   └── App.tsx           # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/expense-manager.git
cd expense-manager
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside **backend/**:

```
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup (Vite + React + TSX)

```bash
cd ../frontend
npm install
```

Run frontend:

```bash
npm run dev
```

The app will be live on:

* Frontend → `http://localhost:5173` (Vite default)
* Backend → `http://localhost:5000`

---

## 📊 Usage

1. **Sign up / Login**
2. **Add expenses** with amount, category, and description
3. **View dashboard** with expense charts powered by Chart.js
4. **Track spending patterns** over time

---

## 📜 License

This project is licensed under the **MIT License**.

---
