import React from 'react';
import { Link } from 'react-router-dom';

const Payroll = () => {
  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <label>
          Employee ID:
          <input type="text" placeholder=   "Enter employee ID" />
        </label>
        <label>
          Month:
          <input type="text" placeholder="Enter the specific month" />
        </label>
        <label>
          Year:
          <input type="text" placeholder="Enter the year" />
        </label>
        <label>
          Deduction (e.g., Tax):
          <input type="text" placeholder="Enter deduction" />
        </label>
        <button type="submit">Calculate Salary</button>
      </div>

      <div>
        <h2>CALCULATED SALARY</h2>
        <h3>PAYROLL ENTRIES</h3>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <label>ID:</label>
            <span>1</span>
          </div>
          <div>
            <label>Employee ID:</label>
            <span>123</span>
          </div>
          <div>
            <label>Calculated Salary:</label>
            <span>$</span>
          </div>
        </div>
      </div>

      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default Payroll;