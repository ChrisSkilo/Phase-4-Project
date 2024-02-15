import React, { useEffect, useState } from "react";
import SalaryForm from "./SalaryForm";
import Navbar from '../Components/Navbar'

function SalaryList() {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    // Fetch the list of salaries with related employee details
    fetch("/salaries")
      .then((response) => response.json())
      .then((data) => {
        setSalaries(data);
      })
      .catch((error) => console.error("Error fetching salaries:", error));
  }, []);

  // Function to handle adding a new salary to the list
  function handleAddSalary(newSalary) {
    if (salaries)
    setSalaries([...salaries, newSalary]);
  }
  console.log(salaries)
  return (
    <div>
      <Navbar />
      <h2>Salary Form And List</h2>

      {/* Pass prop to SalaryForm */}
      <SalaryForm onCalculateSalary={handleAddSalary} />
      
      {/* Display the list of salaries */}
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Calculated Salary</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.id}>
              <td>{salary.employee_id}</td>
              <td>{salary.calculated_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default SalaryList;