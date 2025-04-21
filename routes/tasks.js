import express from 'express';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {
  console.log(tasks);
  res.json(tasks);
});

router.post('/', (req, res) => {
  const newTask = req.body;
  tasks.push({ ...newTask, id: uuidv4() });
  res.send(`Task "${newTask.title}" added successfully!`);
});

router.get('/:id', (req, res) => {
  const { id } = (req.params);

  const foundTask = tasks.find((task) => task.id === id);
  res.send(foundTask);
});

router.delete('/:id', (req, res) => {
  const { id } = (req.params);
  tasks = tasks.filter((task) => task.id !== id);
  res.send(`Task with id ${id} deleted successfully!`);
});

router.patch('/:id', (req, res) => {
  const { id } = (req.params);
  const { status } = req.body;

  const statusUpdate = tasks.find((task) => task.id === id);
  if (status) {
    statusUpdate.status = status;
    res.send(`Task with id ${id} updated successfully!`);
  }
});

export default router;