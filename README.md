<div align="center">
  <img src="./frontend/public/favicon.svg" alt="TaskoraX Logo" width="120" height="120" />

  # 🌟 TaskoraX
  
  **A Premium, Modern SaaS Task Management Platform**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

  [Explore the Docs](#-getting-started) • [Report Bug](#-contact) • [Request Feature](#-contact)
</div>

---

## 🚀 About TaskoraX

**TaskoraX** is a cutting-edge, highly interactive task management solution engineered with the MERN stack. Designed from the ground up to be a SaaS-ready platform, it combines a robust backend architecture with a visually stunning, premium user interface. 

Whether you're organizing daily chores or orchestrating large-scale team projects, TaskoraX adapts to your workflow seamlessly.

### ✨ Highlights
- **Stunning UI/UX:** Built with Tailwind CSS and Framer Motion for liquid-smooth animations, responsive layouts, and a modern aesthetic.
- **Enterprise-Grade Security:** Comprehensive JWT-based authentication, secure password hashing, and token-based email reset flows.
- **Real-Time Productivity:** Experience immediate updates, intuitive task management, and a centralized hub for all your projects.

---

## 📂 Project Structure

TaskoraX is a monorepo separated into two primary environments:

```text
TaskoraX/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/# Reusable UI components
│   │   ├── pages/     # Full application pages
│   │   ├── context/   # React Context providers (Auth, Theme)
│   │   └── ...
├── backend/           # Node.js + Express REST API
│   ├── controllers/   # Route controllers
│   ├── models/        # Mongoose database schemas
│   ├── routes/        # API endpoint definitions
│   └── ...
```

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** Lightning-fast build tool and rendering.
- **Tailwind CSS:** Utility-first styling for a beautiful, custom design.
- **Framer Motion:** Powerful animation library for React.
- **React Router Dom:** Client-side routing.
- **Axios:** Promise-based HTTP client.

### Backend
- **Node.js & Express:** Scalable runtime and web framework.
- **MongoDB & Mongoose:** NoSQL database and object modeling.
- **JSON Web Tokens (JWT):** Secure, stateless authentication.
- **Bcrypt.js:** Password hashing and security.
- **Nodemailer:** Email service integration for password resets.

---

## 🚦 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- npm (v8.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas cluster)

### 1. Clone the repository
```bash
git clone https://github.com/aaryan/TaskoraX.git
cd TaskoraX
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
*Configure your `.env` with your `MONGODB_URI`, `JWT_SECRET`, and SMTP credentials.*
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
*Ensure `VITE_API_URL` in your `.env` points to your backend (default: `http://localhost:5000/api`).*
```bash
npm run dev
```
🎉 **All set!** Visit `http://localhost:5173` to explore TaskoraX.

---

## 📖 API Documentation

Core REST API endpoints to interact with the backend services.

### Auth `[ /api/auth ]`
- `POST /register` - Register a new user account
- `POST /login` - Authenticate and receive JWT
- `POST /forgot-password` - Trigger password reset email
- `PUT /reset-password/:token` - Reset password securely

### Tasks `[ /api/tasks ]`
- `GET /` - Fetch all tasks for the logged-in user
- `POST /` - Create a new task
- `PUT /:id` - Update task details or status
- `DELETE /:id` - Remove a task

---

## 🗺️ Roadmap
- [x] Initial MERN Setup
- [x] Secure JWT Authentication
- [x] Premium UI/UX Implementation
- [ ] Drag-and-Drop Kanban Board
- [ ] Collaborative Workspaces & Teams
- [ ] Real-time Socket.io Notifications

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Made with ❤️ by the TaskoraX Team</p>
</div>
