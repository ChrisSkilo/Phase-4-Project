import React, { useEffect, useState } from "react";
import SalaryForm from "./SalaryForm";
import Navbar from '../Components/Navbar';

function SalaryList() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/salaries?joinedload=employee");
        if (!response.ok) {
          throw new Error("Error fetching salaries");
        }
        const data = await response.json();
        setSalaries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle adding a new salary to the list
  function handleAddSalary(newSalary) {
    setSalaries([...salaries, newSalary]);
  }

  return (
    <div>
      
      

      {/* Pass prop to SalaryForm */}
      <Navbar />
      <h2>Salary Form And List</h2>
      <SalaryForm onCalculateSalary={handleAddSalary} />
      

      {/* Display loading indicator */}
      {loading && <p>Loading salaries...</p>}

      {/* Display error message if there's an error */}
      {error && <p>Error: {error}</p>}

      {/* Display the list of salaries */}
      {!loading && !error && (
        <div>
          {salaries.map((salary) => (
            <div key={salary.id}>
              <span>{`Employee ID: ${salary.employee ? salary.employee_id : 'N/A'} - Salary: ${salary.calculated_salary}`}</span>
            </div>
          ))}
        </div>
      )}

      {/* Display the list of salaries in an HTML table */}
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
