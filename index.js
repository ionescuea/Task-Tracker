import express from 'express';
import bodyParser from 'body-parser';
import tasksRouter from './routes/tasks.js'; // Import the tasks router

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/tasks', tasksRouter); // Use the tasks router for '/tasks' route

app.get('/', (req, res) => res.send('Hello, World!'));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));