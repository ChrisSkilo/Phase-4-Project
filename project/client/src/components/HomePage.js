import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-employee">Add Employee</Link></li>
          <li><Link to="/employees-list">Employees List</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li><Link to="/payroll">Payrolls</Link></li>
        </ul>
      </nav>
      <div>
        <h2>Navigate with ease and enjoy payroll processes</h2>
        <p>Enjoy a hassle-free way to manage salaries. Your journey to efficient payroll starts here!</p>
      </div>
    </div>
  );
};

export default Home;