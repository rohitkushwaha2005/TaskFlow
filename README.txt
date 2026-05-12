TEAM TASK MANAGER

A full-stack task management application for creating projects, assigning tasks to team members, and tracking progress with Admin and Member role-based access control.

====================================================
TECH STACK
==========

Frontend:

* React.js
* Tailwind CSS

Backend:

* Node.js
* Express.js

Database:

* MongoDB Atlas with Mongoose

Authentication:

* JWT Authentication
* bcrypt Password Hashing

Deployment:

* Railway (Backend)
* Vercel (Frontend)

====================================================
FEATURES
========

* User Signup and Login with JWT Authentication
* Secure password hashing using bcrypt
* Protected routes with token-based authentication
* Role-based access control (Admin & Member)
* Admin can create and manage projects
* Admin can assign team members using email
* Admin can create, assign, update, and delete tasks
* Members can view assigned tasks
* Members can update task status
* Task assignment restricted to project members only
* Automatic overdue task detection
* Dashboard analytics cards:

  * Total Tasks
  * Completed Tasks
  * In Progress Tasks
  * Overdue Tasks
* Filter tasks by:

  * Status
  * Priority
  * Project
* Responsive UI with Tailwind CSS
* Sidebar navigation
* Toast notifications
* Loading states and empty states

====================================================
HOW TO RUN LOCALLY
==================

1. Clone the Repository

git clone https://github.com/rohitkushwaha2005/TaskFlow.git

---

## BACKEND SETUP

2. Navigate to backend folder

cd backend

3. Install backend dependencies

npm install

4. Create .env file inside backend folder

PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

5. Start backend server

npm run dev

---

## FRONTEND SETUP

6. Open another terminal

cd frontend

7. Install frontend dependencies

npm install

8. Create .env file inside frontend folder

REACT_APP_API_URL=http://localhost:5000

9. Start frontend server

npm start

---

## OPEN APPLICATION

http://localhost:3000

====================================================
API ROUTES
==========

AUTH ROUTES

* POST /api/auth/register
* POST /api/auth/login

PROJECT ROUTES

* GET /api/projects
* POST /api/projects
* DELETE /api/projects/:id
* POST /api/projects/:id/members
* DELETE /api/projects/:id/members/:memberId

TASK ROUTES

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id

====================================================
ENVIRONMENT VARIABLES
=====================

BACKEND VARIABLES

PORT

* Express server port

MONGODB_URI

* MongoDB Atlas connection string

JWT_SECRET

* Secret key for JWT authentication

CLIENT_URL

* Frontend URL for CORS

FRONTEND VARIABLES

REACT_APP_API_URL

* Backend API URL

====================================================
DEPLOYMENT INSTRUCTIONS
=======================

BACKEND DEPLOYMENT ON RAILWAY

1. Push the project to GitHub.
2. Create a new Railway project from the repository.
3. Add environment variables:

   * MONGODB_URI
   * JWT_SECRET
   * PORT
   * CLIENT_URL
4. Deploy the backend.
5. Copy the Railway backend URL.

FRONTEND DEPLOYMENT ON VERCEL

1. Import the GitHub repository into Vercel.
2. Set root directory as frontend.
3. Add environment variable:

REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app

4. Deploy the frontend.
5. Add the Vercel frontend URL inside Railway CLIENT_URL.

====================================================
LIVE PROJECT
============

Live URL:
https://task-flow-swart-beta.vercel.app

====================================================
GITHUB REPOSITORY
=================

GitHub Repository:
https://github.com/rohitkushwaha2005/TaskFlow

====================================================
DEMO VIDEO
==========

Demo video will be added soon.

====================================================
AUTHOR
======

Rohit Kumar Kushwaha
Indore Institute of Science and Technology, Indore
Passionate about Full-Stack Development and Modern Web Applications.
