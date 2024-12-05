import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ deleteAllTasks }) {  // Accept deleteAllTasks as a prop
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-around">
        {/* Create Task Button */}
        <Link to="/taskform" className="btn btn-outline-success my-2 my-sm-0" type="button">
          Create Task
        </Link>
        
        {/* Search Form */}
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>

        {/* Delete All Button */}
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={deleteAllTasks}  // Trigger deleteAllTasks when clicked
        >
          Delete All
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
