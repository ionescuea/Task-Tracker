import Task from '../models/Task.js';

// CREATE Task
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).send(`Task "${newTask.title}" added successfully!`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Task by ID
export const getIdTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send('Task not found');
    res.send(`Task with id ${id} deleted successfully!`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).send('Task not found');

    if (status) {
      task.status = status;
      await task.save();
    }

    res.send(`Task with id ${id} updated successfully!`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
