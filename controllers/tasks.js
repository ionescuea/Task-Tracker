import { v4 as uuidv4 } from 'uuid';

let tasks = [];

export const createTask = (req, res) => {
  const newTask = req.body;
  tasks.push({ ...newTask, id: uuidv4() });
  res.send(`Task "${newTask.title}" added successfully!`);
};

export const getTasks = (req, res) => {
  res.json(tasks);
};

export const getIdTask = (req, res) => {
  const { id } = req.params;
  const foundTask = tasks.find((task) => task.id === id);
  res.send(foundTask);
};

export const deleteTask = (req, res) => {
  const { id } = (req.params);
  tasks = tasks.filter((task) => task.id !== id);
  res.send(`Task with id ${id} deleted successfully!`);
};

export const updateTask = (req, res) => {
  const { id } = (req.params);
  const { status } = req.body;

  const statusUpdate = tasks.find((task) => task.id === id);
  if (status) {
    statusUpdate.status = status;
    res.send(`Task with id ${id} updated successfully!`);
  }
};