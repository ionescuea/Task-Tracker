import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TaskDetailsModal = ({ show, handleClose, taskId, onTaskUpdated, onTaskDeleted }) => {
  // const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId && show) {
        try {
          const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
          const taskData = res.data;
          setTitle(taskData.title || '');
          setDescription(taskData.description || '');
          setStatus(taskData.status || 'pending');
        } catch (error) {
          console.error('Failed to load task:', error);
        }
      }
    };
  
    fetchTask();
  }, [taskId, show]); 

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleSaveClick = () => {
    console.log('Save clicked – showing confirmation modal');
    setShowSaveConfirm(true);
  };

  const handleConfirmedDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      onTaskDeleted(taskId);
      setShowDeleteConfirm(false); 
      handleClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleConfirmedSave = async () => {
    if (!title || !description || !status) {
      alert('All fields must be filled out');
      return;
    }
  
    try {
      const updatedTask = { title, description, status };
      const response = await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
      onTaskUpdated(taskId, response.data); 
      setShowSaveConfirm(false);
      handleClose(); 
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmedDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Save Modal */}
      <Modal show={showSaveConfirm} onHide={() => setShowSaveConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to save the changes to this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmedSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskDetailsModal;
