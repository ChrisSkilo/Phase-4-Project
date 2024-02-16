import React, { useState } from "react";
import Navbar from '../Components/Navbar';

const PayrollForm = ({ onAddPayroll }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    month: "",
    year: "",
    hourly_rate: "",
    leave_deduction_rate: "",
    bonus_rate: "",
    tax_deduction_rate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Clear the specific error when the user starts typing
    setErrors({ ...errors, [name]: "" });

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make a POST request to your backend server
      const response = await fetch("/payrolls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit payroll");
      }

      // Parse the response JSON
      const newPayroll = await response.json();

      // Call the parent component's onAddPayroll callback with the new payroll data
      onAddPayroll(newPayroll);

      // Optionally, you can reset the form after submission
      setFormData({
        employee_id: "",
        month: "",
        year: "",
        hourly_rate: "",
        leave_deduction_rate: "",
        bonus_rate: "",
        tax_deduction_rate: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const validateForm = async (data) => {
    const errors = {};

    if (!data.employee_id) {
      errors.employee_id = "Employee ID is required.";
    } else {
      // Validate that the employee with the provided ID exists
      try {
        const response = await fetch(`/employees/${data.employee_id}`);
        if (!response.ok) {
          errors.employee_id = "Employee with this ID does not exist.";
        }
      } catch (error) {
        console.error("Error checking employee existence:", error);
      }
    }

    // Validate other fields
    if (!data.month || !data.year) {
      errors.date = "Month and year are required.";
    } else {
      // Validate that month and year do not go beyond the current month and year
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
      const currentYear = new Date().getFullYear();
      if (Number(data.year) > currentYear || (Number(data.year) === currentYear && Number(data.month) > currentMonth)) {
        errors.date = "Invalid month and year.";
      }
    }

    if (data.hourly_rate < 50 || data.hourly_rate > 100) {
      errors.hourly_rate = "Hourly rate must be between 50 and 100.";
    }

    if (data.leave_deduction_rate < 3 || data.leave_deduction_rate > 5) {
      errors.leave_deduction_rate = "Leave deduction rate must be between 3 and 5.";
    }

    if (data.bonus_rate >= 3) {
      errors.bonus_rate = "Bonus rate must be less than 3.";
    }

    if (data.tax_deduction_rate < 6 || data.tax_deduction_rate > 8) {
      errors.tax_deduction_rate = "Tax deduction rate must be between 6 and 8.";
    }

    return errors;
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h2 className="mb-4">PAYROLL Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employee_id" className="form-label">Employee ID:</label>
          <input
            type="text"
            className={`form-control ${errors.employee_id ? 'is-invalid' : ''}`}
            id="employee_id"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />
          {errors.employee_id && <div className="invalid-feedback">{errors.employee_id}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="month" className="form-label">Month:</label>
          <input
            type="text"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year:</label>
          <input
            type="text"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="hourly_rate" className="form-label">Hourly Rate:</label>
          <input
            type="text"
            className={`form-control ${errors.hourly_rate ? 'is-invalid' : ''}`}
            id="hourly_rate"
            name="hourly_rate"
            value={formData.hourly_rate}
            onChange={handleChange}
            required
          />
          {errors.hourly_rate && <div className="invalid-feedback">{errors.hourly_rate}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="leave_deduction_rate" className="form-label">Leave Deduction Rate:</label>
          <input
            type="text"
            className={`form-control ${errors.leave_deduction_rate ? 'is-invalid' : ''}`}
            id="leave_deduction_rate"
            name="leave_deduction_rate"
            value={formData.leave_deduction_rate}
            onChange={handleChange}
            required
          />
          {errors.leave_deduction_rate && <div className="invalid-feedback">{errors.leave_deduction_rate}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="bonus_rate" className="form-label">Bonus Rate:</label>
          <input
            type="text"
            className={`form-control ${errors.bonus_rate ? 'is-invalid' : ''}`}
            id="bonus_rate"
            name="bonus_rate"
            value={formData.bonus_rate}
            onChange={handleChange}
            required
          />
          {errors.bonus_rate && <div className="invalid-feedback">{errors.bonus_rate}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="tax_deduction_rate" className="form-label">Tax Deduction Rate:</label>
          <input
            type="text"
            className={`form-control ${errors.tax_deduction_rate ? 'is-invalid' : ''}`}
            id="tax_deduction_rate"
            name="tax_deduction_rate"
            value={formData.tax_deduction_rate}
            onChange={handleChange}
            required
          />
          {errors.tax_deduction_rate && <div className="invalid-feedback">{errors.tax_deduction_rate}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Submit Payroll</button>
      </form>
    </div>
  );
};

export default PayrollForm;
