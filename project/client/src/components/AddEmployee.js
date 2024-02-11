import React from 'react';
import { Link } from 'react-router-dom';


const AddEmployee = () => {
  //  add state and functions for form handling here

  const handleSubmit = (e) => {
    e.preventDefault();
    // doing the logic to send data to the server 
  };

  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      {/*  form for adding a new employee */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" placeholder="Enter name" /* Add value and onChange handlers if needed */ />
        </label>
        <br />
        <label>
          Department:
          <input type="text" placeholder="Enter department" /* " " */ />
        </label>
        <br />
        <label>
          Job Role:
          <input type="text" placeholder="Enter job role" /* " " */ />
        </label>
        <br />
        {/* more fields if needed */}
        <button type="submit">Add Employee</button>
      </form>

      {/* Link to go back to the home page */}
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default AddEmployee;
