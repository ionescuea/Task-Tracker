import express from 'express';
import bodyParser from 'body-parser';
import tasksRouter from './routes/tasks.js'; // Import the tasks router
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const app = express();
const PORT = 5000;

connectDB();

app.use(bodyParser.json());
app.use('/api/tasks', tasksRouter); 

app.get('/', (req, res) => res.send('Hello, World!'));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
