import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const NewTaskForm = ({ show, handleClose, handleSave }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(task);
    setTask({ title: '', description: '' }); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTaskForm;
