import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbars/Navbar';
import TaskForm from './components/Pages/TaskPage/Taskform';
import Card from './components/Pages/CardPage/Card';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, deleteAllTasks }) => {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Only render Navbar if not on /taskform route */}
      {location.pathname !== '/taskform' && <Navbar deleteAllTasks={deleteAllTasks} />}
      {children}
    </>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]); // Clear all tasks
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <Layout deleteAllTasks={deleteAllTasks}>
        <Routes>
          <Route
            path="/taskform"
            element={<TaskForm addTask={addTask} updateTask={updateTask} />}
          />
          <Route
            path="/tasks"
            element={<Card tasks={tasks} deleteTask={deleteTask} />}
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
};

export default App;
