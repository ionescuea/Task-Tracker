import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const TaskItem = ({ task, onStatusUpdate, onClick }) => {
  const [status, setStatus] = useState(task.status);
  const [tempStatus, setTempStatus] = useState(task.status);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setStatus(task.status);
    setTempStatus(task.status);
  }, [task]); 

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setTempStatus(selectedStatus);
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, {
        status: tempStatus,
      });
      setStatus(tempStatus);
      onStatusUpdate(task._id, tempStatus);
      setShowConfirm(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleCancelUpdate = () => {
    setTempStatus(status);
    setShowConfirm(false);
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title
            onClick={() => onClick(task._id)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {task.title}
          </Card.Title>
          <Card.Text>{task.description}</Card.Text>

          <Form.Select value={tempStatus} onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Card.Body>
      </Card>

      <Modal show={showConfirm} onHide={handleCancelUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the status to{' '}
          <strong>{tempStatus}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelUpdate}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Yes, Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskItem;
