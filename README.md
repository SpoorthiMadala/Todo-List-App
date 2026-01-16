# Todo List Application - MERN Stack

A modern, full-stack todo list application with email OTP authentication, built with the MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features

### Authentication
- 🔐 Email-based registration with OTP verification
- 🔑 Secure login with JWT tokens
- ✉️ Beautiful HTML email templates for OTP delivery
- 🔄 OTP resend functionality with countdown timer

### Task Management
- ➕ Create tasks with title, description, and deadline
- ✏️ Edit existing tasks
- 🗑️ Delete tasks with confirmation
- ✅ Toggle task completion status
- 📅 Automatic sorting by deadline (ascending order)
- 🎨 Color-coded deadlines (overdue, today, upcoming)

### Design
- 🌈 Vibrant gradient color scheme
- 💎 Glassmorphism effects
- ✨ Smooth animations and micro-interactions
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎭 Floating orb background animations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **React Icons** - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **Gmail account** with App Password (for OTP emails)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
cd todo-list-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### 📧 Setting up Gmail App Password:
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password to `EMAIL_PASS`

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🎯 Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Register**: Create an account with your email and password
2. **Verify OTP**: Check your email for the 6-digit OTP code
3. **Login**: Sign in with your credentials
4. **Manage Tasks**:
   - Click "Add New Task" to create a task
   - Set a title, description, and deadline
   - Click the checkbox to mark tasks as complete
   - Use edit/delete buttons to modify tasks
   - Tasks are automatically sorted by deadline

## 🎨 Design Features

### Color Coding
- 🔴 **Red** - Overdue tasks
- 🟠 **Orange** - Due today
- 🔵 **Blue** - Upcoming tasks
- 🟢 **Green** - Completed tasks

### Animations
- Fade-in animations on page load
- Smooth transitions on hover
- Floating orb background animations
- Checkbox completion animation
- Modal slide-in effects

## 📁 Project Structure

```
todo-list-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── OTP.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── emailService.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddTaskModal.jsx
    │   │   ├── EditTaskModal.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── TaskCard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── VerifyOTP.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- OTP expiration (10 minutes)
- Input validation
- CORS configuration

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/resend-otp` - Resend OTP

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle completion

## 🐛 Troubleshooting

### Email not sending
- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Ensure EMAIL_USER and EMAIL_PASS are set in .env

### MongoDB connection error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB port (default: 27017)

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify proxy settings in vite.config.js

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

---

**Happy Task Managing! 🎉**
