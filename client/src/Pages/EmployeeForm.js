import React, { useState } from "react";
<<<<<<< HEAD:project/client/src/Pages/EmployeeForm.js
import Navbar from '../Components/Navbar';
=======
import Navbar from '../Components/Navbar'


>>>>>>> main:client/src/Pages/EmployeeForm.js

function EmployeeForm({ onAddEmployee }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    department: "",
    position: "",
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Make a POST request to your backend server
      const response = await fetch("/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      // Parse the response JSON
      const newEmployee = await response.json();

      // Call the callback function to add the new employee to the state
      onAddEmployee(newEmployee);

      // Reset the form after successful submission
      setEmployeeData({
        name: "",
        department: "",
        position: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
<<<<<<< HEAD:project/client/src/Pages/EmployeeForm.js
    <div className="container mt-5">
      <Navbar />
      <h2 className="mb-4">Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department:</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={employeeData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position:</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={employeeData.position}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
=======
   <div>
     <Navbar/>
     <h2>Employee Form</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={employeeData.name}
        onChange={handleChange}
        required
      />

      <label>Department:</label>
      <input
        type="text"
        name="department"
        value={employeeData.department}
        onChange={handleChange}
        required
      />

      <label>Position:</label>
      <input
        type="text"
        name="position"
        value={employeeData.position}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Employee</button>
    </form>
   </div>
  );
}
export default EmployeeForm;
>>>>>>> main:client/src/Pages/EmployeeForm.js
