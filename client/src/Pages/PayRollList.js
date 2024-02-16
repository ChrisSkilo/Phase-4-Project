import React, { useEffect, useState } from "react";
import PayrollForm from "./PayrollForm";
<<<<<<< HEAD:project/client/src/Pages/PayRollList.js
import Navbar from '../Components/Navbar';
=======

>>>>>>> main:client/src/Pages/PayRollList.js

function PayrollList() {
  const [payrolls, setPayrolls] = useState([]);

<<<<<<< HEAD:project/client/src/Pages/PayRollList.js
  // Fetch the list of payrolls from your backend server
  useEffect(() => {
    fetch("/payrolls")
      .then((response) => response.json())
      .then((data) => setPayrolls(data))
      .catch((error) => console.error("Error fetching payrolls:", error));
=======

  // Fetch the list of payrolls from your backend server
  useEffect(() => {

    fetch("/payrolls")
      .then((response) => response.json())
      .then((data) => setPayrolls(data))
      .catch((error) => console.error("Error fetching salaries:", error));
>>>>>>> main:client/src/Pages/PayRollList.js
  }, []);

  function handleAddPayroll(newPayroll) {
    setPayrolls([...payrolls, newPayroll]);
  }

  return (
<<<<<<< HEAD:project/client/src/Pages/PayRollList.js
    <div className="container mt-4">
      <Navbar />
      <PayrollForm onAddPayroll={handleAddPayroll} />
      <h2 className="mb-4">PAYROLL List</h2>
      <ul className="list-group">
        {payrolls.map((payroll) => (
          <li key={payroll.id} className="list-group-item">
            <strong>Employee ID:</strong> {payroll.employee_id} - <strong>Month:</strong> {payroll.month} - <strong>Year:</strong> {payroll.year}
          </li>
        ))}
      </ul>
=======
    <div>
      <PayrollForm onAddPayroll={handleAddPayroll} />
      <h2>PAYROLL List</h2>

      {/* Display the list of payrolls in an HTML table */}
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Month</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll.id}>
              <td>{payroll.employee_id}</td>
              <td>{payroll.month}</td>
              <td>{payroll.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> main:client/src/Pages/PayRollList.js
    </div>
  );
}

<<<<<<< HEAD:project/client/src/Pages/PayRollList.js
export default PayrollList;
=======
export default PayrollList;
>>>>>>> main:client/src/Pages/PayRollList.js
