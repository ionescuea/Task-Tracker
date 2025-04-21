import express from 'express';

const router = express.Router();

const tasks = [
  {
    title: "First task",
    description: "Create first task in the current project",
    status: "completed"
  },
  {
    title: "Second task",
    description: "Create a second task in the current project",
    status: "pending"
  }
];

router.get('/', (req, res) => {
  console.log(tasks);
  res.json(tasks);
});

router.post('/', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.send(`Task "${newTask.title}" added successfully!`);
  // res.status(201).json(newTask);
});

export default router;