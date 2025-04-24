import express from 'express';
import { createTask, getTasks, getIdTask, deleteTask, updateTask } from '../controllers/tasksController.js';

const router = express.Router();

// Define the routes for tasks
// GET /api/tasks - Get all tasks
router.get('/', getTasks);

// POST /api/tasks - Create a new task
// The request body should contain the task details
router.post('/', createTask);

// GET /api/tasks/:id - Get a task by ID
// The :id parameter in the URL will be replaced with the actual task ID
router.get('/:id', getIdTask);

// DELETE /api/tasks/:id - Delete a task by ID
// The :id parameter in the URL will be replaced with the actual task ID
// This route will remove the task from the list of tasks
router.delete('/:id', deleteTask);

// PATCH /api/tasks/:id - Update a task by ID
// The :id parameter in the URL will be replaced with the actual task ID
router.patch('/:id', updateTask);

export default router;
