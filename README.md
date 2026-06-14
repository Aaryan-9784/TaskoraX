# TaskoraX

TaskoraX is a modern, premium SaaS task management application built with the MERN stack (MongoDB, Express, React, Node.js). It offers a beautiful, responsive UI designed for maximum productivity.

## 🌟 Key Features

- **Secure Authentication**: JWT-based authentication with Login, Registration, and a robust Password Reset flow via secure email tokens.
- **Modern UI**: Built with React and Tailwind CSS for a premium, responsive, and animated user experience using Framer Motion.
- **Task Management**: Create, read, update, and delete tasks seamlessly.
- **User Dashboard**: Dedicated dashboard and settings pages to manage profiles and app preferences.
- **Robust Backend**: Node.js & Express REST API with MongoDB for scalable data storage.

## 📁 Project Structure

The project has been separated into two distinct folders for better maintainability and clearer deployment:

- `/frontend`: Contains the React application built with Vite, Tailwind CSS, React Router, and Axios.
- `/backend`: Contains the Node.js API built with Express, MongoDB, Mongoose, and Nodemailer.

## 🚀 How to Run the Project Locally

You will need to open **two separate terminal windows**—one for the backend and one for the frontend.

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A MongoDB Atlas Database connection string (or local MongoDB server).
- An SMTP server for email sending (e.g., Mailtrap, SendGrid) to test the password reset flow.

---

### Step 1: Start the Backend Server

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Setup Environment Variables:
   - Copy the `.env.example` file and rename it to `.env`
   - Fill in your `MONGODB_URI` with your actual MongoDB connection string.
   - Configure your email SMTP settings (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`) for the forgot password feature.
4. Start the server (runs on `http://localhost:5000` by default):
   ```bash
   npm run dev
   ```

---

### Step 2: Start the Frontend Application

1. Open a **second, separate terminal** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on `http://localhost:5173` by default):
   ```bash
   npm run dev
   ```

---

### Usage

Once both servers are running:
1. Open your browser and navigate to `http://localhost:5173`.
2. Register a new account or test the **Forgot Password** flow to ensure your email SMTP configuration is correctly setup.
3. Start managing your tasks in a beautiful, responsive dashboard!

