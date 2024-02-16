import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const requestData = {
        employee_id: employeeId,
        date: new Date(date).toISOString().split('T')[0],
        hours_worked: hoursWorked,
      };
  
      console.log('Request Data:', requestData);
  
      const response = await fetch('http://127.0.0.1:5554/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to record attendance: ${response.status} ${response.statusText}`);
      }
  
      // Handle success (optional)
      console.log('Attendance recorded successfully');
    } catch (error) {
      // Handle errors (optional)
      console.error('Error recording attendance:', error.message);
    }
  };
  ;

  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            placeholder="Enter employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Hours Worked:
          <input
            type="text"
            placeholder="Enter hours worked"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
          />
        </label>
        <br />
        
        <button type="submit">Record Attendance</button>
      </form>

      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default Attendance;









