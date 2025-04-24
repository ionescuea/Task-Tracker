import express from 'express';
import { createTask, getTasks, getIdTask, deleteTask, updateTask } from '../controllers/tasksController.js';

const router = express.Router();

// Get all tasks
router.get('/', getTasks);

// Create a new task
router.post('/', createTask);

// Get a task by ID
router.get('/:id', getIdTask);

// Delete a task by ID
router.delete('/:id', deleteTask);

// Update a task by ID
router.patch('/:id', updateTask);

export default router;
