import React, { useEffect, useState } from "react";
import PayrollForm from "./PayrollForm";


function PayrollList() {
  const [payrolls, setPayrolls] = useState([]);


  // Fetch the list of payrolls from your backend server
  useEffect(() => {

    fetch("/payrolls")
      .then((response) => response.json())
      .then((data) => setPayrolls(data))
      .catch((error) => console.error("Error fetching salaries:", error));
  }, []);

  function handleAddPayroll(newPayroll) {
    setPayrolls([...payrolls, newPayroll]);
  }

  return (
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
    </div>
  );
}

export default PayrollList;