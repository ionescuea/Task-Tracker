import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import NewTaskForm from './NewTaskForm';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');; // adjust this if deployed
      setTasks(res.data);
      console.log('Fetched tasks:', res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks(); // fetch on mount
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveTask = async (task) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', task);
      fetchTasks(); // refresh task list after saving
      handleCloseModal();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  return (
    <Container className="mt-4">
      <Button
        variant="success"
        className="mb-4"
        onClick={handleShowModal}
        style={{ position: 'fixed', bottom: '20px', right: '20px', borderRadius: '50%' }}
      >
        <strong>+</strong>
      </Button>

      <h1>Task List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>

      <NewTaskForm
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTask}
      />
    </Container>
  );
};

export default App;
