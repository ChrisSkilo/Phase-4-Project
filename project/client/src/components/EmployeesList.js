import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5554/employees');    
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      <h2>LIST OF ALL EMPLOYEES</h2>

      {employees.map(employee => (
  <div key={employee.id}>
    <label>ID:</label>
    <span>{employee.id}</span>
    <br />
    <label>Name:</label>
    <span>{employee.name}</span>
    <br />
    <label>Department:</label>
    <span>{employee.department}</span>
    <br />
    <label>Position:</label>
    <span>{employee.position}</span>
    <br />
    
    <br />
  </div>
))}


      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default EmployeesList;








