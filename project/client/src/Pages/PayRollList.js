import React, { useEffect, useState } from "react";
import PayrollForm from "./PayrollForm";
import Navbar from '../Components/Navbar';

function PayrollList() {
  const [payrolls, setPayrolls] = useState([]);

  // Fetch the list of payrolls from your backend server
  useEffect(() => {
    fetch("/payrolls")
      .then((response) => response.json())
      .then((data) => setPayrolls(data))
      .catch((error) => console.error("Error fetching payrolls:", error));
  }, []);

  function handleAddPayroll(newPayroll) {
    setPayrolls([...payrolls, newPayroll]);
  }

  return (
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
    </div>
  );
}

export default PayrollList;
