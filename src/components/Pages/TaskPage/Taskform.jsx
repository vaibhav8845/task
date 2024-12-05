import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Taskform.css';

function TaskForm({ addTask, updateTask }) {
  const [taskName, setTaskName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [reminder, setReminder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { task, index } = location.state || {}; // Get task data and index from state

  useEffect(() => {
    if (task) {
      // If we have a task, pre-fill the form with task data
      setTaskName(task.taskName);
      setEmail(task.email);
      setDate(task.date);
      setReminder(task.reminder);
    }
  }, [task]);

  const handleSave = () => {
    if (!taskName || !email || !date) {
      toast.error('Please fill out all fields.', {
        autoClose: 700, // The toast will disappear after 1.5 seconds
        pauseOnHover: false, // Disable pausing on hover
      });
      return;
    }

    const updatedTask = { taskName, email, date, reminder };

    if (task) {
      // Update existing task
      updateTask(index, updatedTask); // Pass index to update the correct task
      toast.success('Task Updated!', {
        autoClose: 700, // The toast will disappear after 1.5 seconds
        pauseOnHover: false,
      });
    } else {
      // Add new task
      addTask(updatedTask);
      toast.success('Task Saved!', {
        autoClose: 700, // The toast will disappear after 1.5 seconds
        pauseOnHover: false,
      });
    }

    navigate('/tasks');
  };

  const handleReset = () => {
    setTaskName('');
    setEmail('');
    setDate('');
    setReminder(false);
  };

  return (
    <div className="task-form container mt-5">
      <h2 className="text-center">{task ? 'Edit Task' : 'Create Task'}</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
            className="form-check-input"
            id="reminderCheck"
          />
          <label className="form-check-label" htmlFor="reminderCheck">
            Set Reminder
          </label>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-success"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-danger"
          >
            Reset
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default TaskForm;
