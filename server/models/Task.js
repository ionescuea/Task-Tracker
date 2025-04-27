import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in-progress', 'completed'],
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
