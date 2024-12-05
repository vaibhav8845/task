import React, { useState } from "react";
import "./Subtask.css"; // Import the modal CSS
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome icons

function Subtask({ task, closeModal }) {
  const [subtaskName, setSubtaskName] = useState("");
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [subtaskDate, setSubtaskDate] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track if we are editing a subtask
  const [editedSubtask, setEditedSubtask] = useState(null); // Store the subtask being edited

  const handleAddSubtask = () => {
    if (!subtaskName || !subtaskDescription || !subtaskDate) {
      alert("Please fill all fields before adding a subtask.");
      return;
    }

    const newSubtask = {
      name: subtaskName,
      description: subtaskDescription,
      date: subtaskDate,
    };

    setSubtasks([...subtasks, newSubtask]);

    // Clear input fields
    setSubtaskName("");
    setSubtaskDescription("");
    setSubtaskDate("");
  };

  const handleEditSubtask = (index) => {
    const subtaskToEdit = subtasks[index];
    setSubtaskName(subtaskToEdit.name);
    setSubtaskDescription(subtaskToEdit.description);
    setSubtaskDate(subtaskToEdit.date);
    setIsEditing(index); // Set the subtask index to be edited
    setEditedSubtask(subtaskToEdit); // Store the subtask to be edited
  };

  const handleUpdateSubtask = () => {
    if (!subtaskName || !subtaskDescription || !subtaskDate) {
      alert("Please fill all fields before updating a subtask.");
      return;
    }

    const updatedSubtasks = subtasks.map((subtask, index) =>
      index === isEditing
        ? { ...subtask, name: subtaskName, description: subtaskDescription, date: subtaskDate }
        : subtask
    );

    setSubtasks(updatedSubtasks);
    setIsEditing(null);
    setSubtaskName("");
    setSubtaskDescription("");
    setSubtaskDate("");
  };

  const handleDeleteSubtask = (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal} className="close-btn">X</button>
        <h4 className="text-secondary">{isEditing !== null ? "Edit Subtask" : "Add Subtask"}</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={subtaskName}
              onChange={(e) => setSubtaskName(e.target.value)}
              placeholder="Subtask name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={subtaskDescription}
              onChange={(e) => setSubtaskDescription(e.target.value)}
              placeholder="Subtask description"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={subtaskDate}
              onChange={(e) => setSubtaskDate(e.target.value)}
            />
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button
              onClick={isEditing !== null ? handleUpdateSubtask : handleAddSubtask}
              className="btn btn-primary"
            >
              {isEditing !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h5>Subtask List</h5>
          <ul className="list-group">
            {subtasks.map((subtask, index) => (
              <li key={index} className="list-group-item">
                <strong>{subtask.name}</strong> - {subtask.description} ({subtask.date})
                <div className="float-end mt-3">
                  <button
                    className="btn btn-info btn-sm me-2 "
                    onClick={() => handleEditSubtask(index)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-5"
                    onClick={() => handleDeleteSubtask(index)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Subtask;
