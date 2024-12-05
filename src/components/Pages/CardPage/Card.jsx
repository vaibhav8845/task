import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Card.css';
import Subtask from '../SubtaskPage/Subtask';

function Card({ tasks, deleteTask, addSubtask }) {
  const navigate = useNavigate(); // Initialize navigate
  const [showModal, setShowModal] = useState(false); // State to show/hide modal
  const [currentTask, setCurrentTask] = useState(null); // State to store the task for which subtask is being added

  const navigateToEdit = (task, index) => {
    // Navigate to TaskForm and pass task data and index via state
    navigate('/taskform', { state: { task, index } });
  };

  const openModal = (task) => {
    setCurrentTask(task); // Set the current task for which subtask is being added
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Task List</h2>
      <div className="row">
        {tasks.map((task, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card shadow-lg border-0 task-card">
              <div className="card-body">
                <p className="card-title">Task Name: {task.taskName}</p>
                <p className="card-text">Email: {task.email}</p>
                <p className="card-text">Date: {task.date}</p>
                <p className="card-text">
                  Reminder: {task.reminder ? 'Yes' : 'No'}
                </p>
                {/* Subtask Button */}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(index)}  // Delete individual task
                  >
                    <FaTrashAlt />
                  </button>
                  {/* Edit Icon */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigateToEdit(task, index)} // Pass task data and index
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => openModal(task)} // Open modal to add subtask
                  >
                    Add Subtask
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtask Modal */}
      {showModal && <Subtask task={currentTask} closeModal={closeModal} />}
    </div>
  );
}

export default Card;
