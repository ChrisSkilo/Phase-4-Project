import React from 'react';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
 
  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      <h2>LIST OF ALL EMPLOYEES</h2>
      
      <div>
        <label>ID:</label>
        <span>1</span>
      </div>
      <div>
        <label>Name:</label>
        <span>Jas huy</span>
      </div>
      <div>
        <label>Department:</label>
        <span>IT</span>
      </div>
      <div>
        <label>Position:</label>
        <span>Software Developer</span>
      </div>
    
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default EmployeesList;