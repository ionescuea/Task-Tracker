import express from 'express';
import { createTask, getTasks, getIdTask, deleteTask, updateTask } from '../controllers/tasks.js';

const router = express.Router();

// Define the routes for tasks
// GET /api/tasks - Get all tasks
router.get('/', getTasks);

router.post('/', createTask);

router.get('/:id', getIdTask);

router.delete('/:id', deleteTask);

router.patch('/:id', updateTask);

export default router;