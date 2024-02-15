import React from 'react';
import { Link } from 'react-router-dom';

const Attendance = () => {
  // add state and functions for attendance handling 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementing the logic to record attendance 
  };

  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date"/>
        </label>
        <br />
        <label>
          Employee ID:
          <input type="text" placeholder="Enter employee ID"  />
        </label>
        <br />
        <label>
          Hours Worked:
          <input type="text" placeholder="Enter hours worked"  />
        </label>
        <br />
        <label>
          Leave Taken:
          <input type="text" placeholder="Enter leave taken"  />
        </label>
        <br />
        
        <button type="submit">Record Attendance</button>
      </form>

      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default Attendance;