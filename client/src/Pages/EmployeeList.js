import React, { useEffect, useState } from "react";
import EmployeeForm from './EmployeeForm';


function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    // Fetch the list of employees from your backend server
    fetch("/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  function handleAddEmployee(newEmployee) {
    setEmployees([...employees, newEmployee]);
  }

  function handleDeleteEmployee(employeeId) {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) {
      return;
    }

    // Send a DELETE request to remove the employee
    fetch(`/employees/${employeeId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the employee from the state
        setEmployees(employees.filter((employee) => employee.id !== employeeId));

        
        // Delete salary and payroll associated with the employee
        fetch(`/salaries/${employeeId}`, {
          method: 'DELETE',
        })
          .catch((error) => console.error("Error deleting salary:", error));

        fetch(`/payrolls/${employeeId}`, {
          method: 'DELETE',
        })
          .catch((error) => console.error("Error deleting payroll:", error));
      })
      .catch((error) => console.error("Error deleting employee:", error));
  }

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  const filteredEmployees = filterBy === 'All' ? employees : employees.filter((employee) => employee.department === filterBy);

  const employeeList = filteredEmployees.map((employee) => (
    <div key={employee.id}>
      <span>{employee.id} {employee.name} - {employee.department} - {employee.position}</span>
      <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
    </div>
  ));

  return (
    <div>
      
      <EmployeeForm onAddEmployee={handleAddEmployee} />
      <h2>Employee List</h2>

      <label>Filter by Department:</label>
      <select name="filter" onChange={handleFilterChange} value={filterBy}>
        <option value="All">All</option>
        <option value="Finance">Finance</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>
      </select>

      {employeeList}

      
    </div>
  );
}

export default EmployeeList;