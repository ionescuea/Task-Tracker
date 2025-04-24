# Task Tracker App

A full-stack task management application built with React and Node.js + Express. Users can create, view, update, and delete tasks, with data persisted on the backend.

## Project structure

- client/|React frontend
- server/|Express backend

## Features

- Add, edit, delete tasks
- Update task status (Pending / In Progress / Completed)
- Modal-based forms and confirmations
- RESTful API
- Clean UI using React Bootstrap

## Getting started

1. Start the backend server

  - cd server
  - npm install
  - npm start (server runs at: http://localhost:5000)

2. Start the frontend client

  - cd client
  - npm install
  - npm start (server runs at: http://localhost:3000)

## Tech stack

- Frontend: React, React Bootstrap, Axios
- Backend: Node.js, Express, CORS
- Database: MongoDB + Mongoose
- Environment Variables: stored in .env