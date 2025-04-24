import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewTaskForm from './components/NewTaskForm';
import TaskItem from './components/TaskItem';
import TaskDetailsModal from './components/TaskDetailsModal';
import axios from 'axios';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleStatusUpdate = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const handleOpenDetails = (taskId) => {
    setSelectedTaskId(taskId);
    setShowTaskDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedTaskId(null);
    setShowTaskDetails(false);
  };

  const handleTaskUpdated = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...updatedData } : task))
    );
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <Container className="mt-4">
      <Button
        variant="success"
        className="mb-4"
        onClick={handleShowModal}
        style={{
          position: 'fixed',
          top: '25px',             // Adjust position from the top
          right: '120px',           // Adjust position from the right
          // borderRadius: '50%',     // Make the button round
          // padding: '15px 25px',    // Add padding to make the button larger
          fontSize: '16px',        // Slightly larger font size
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',  // Add shadow for effect
          zIndex: 9999,
        }}
      >
        <strong>+ Add New Task</strong>
      </Button>

      <h1>Task List</h1>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onStatusUpdate={handleStatusUpdate}
          onClick={handleOpenDetails}
        />
      ))}

      <NewTaskForm
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTask}
      />

      <TaskDetailsModal
        show={showTaskDetails}
        handleClose={handleCloseDetails}
        taskId={selectedTaskId}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />

    </Container>
  );
};

export default App;
