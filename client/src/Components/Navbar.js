import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/employee-form">Employee Form</Link></li>
        <li><Link to="/employee-list">Employee List</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/payroll-form">Payroll Form</Link></li>
        <li><Link to="/payroll-list">Payroll List</Link></li>
        <li><Link to="/salary-form">Salary Form</Link></li>
        <li><Link to="/salary-list">Salary List</Link></li>
        <li><Link to="/Home">Home</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;