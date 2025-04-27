# Task-Tracker – Backend (Express API)

This is the **Node.js + Express** backend server for the Task Tracker app.

*Note: The `.env` file is enabled for testing purposes. The `MONGO_URI` key is temporary.*

## Features

- Create, read, update, delete tasks
- RESTful API endpoints
- MongoDB-ready

## Getting Started

1. Navigate to the `server/` directory:

- cd server

2. Install dependencies:

- npm install

3. Server runs on: http://localhost:5000

## API Routes

|Method|Route|Description|
|:-----|-----|-----------|
|GET|/api/tasks|Fetch all tasks|
|GET|/api/tasks/:id|Fetch single task|
|POST|/api/tasks|Create a new task|
|PATCH|/api/tasks/:id|Update a task|
|DELETE|/api/tasks/:id|Delete a task|

## Tech Stack

- Node.js

- Express

- CORS

- MongoDB + Mongoose