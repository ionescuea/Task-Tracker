import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const NewTaskForm = ({ show, handleClose, handleSave }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: new Date().toLocaleString('sv-SE').slice(0, 16).replace('T', ' '),
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
    setTask({ title: '', description: '', dueDate: new Date().toLocaleString('sv-SE').slice(0, 16).replace('T', ' ') });
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
          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewTaskForm;
