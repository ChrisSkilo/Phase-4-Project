import React, { useState } from "react";
import Navbar from '../Components/Navbar';

const SalaryForm = ({ onCalculateSalary }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    month: "",
    year: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
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
      const response = await fetch("/salaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate and save salary");
      }

      // Optionally, you can handle the successful submission here
      console.log("Salary calculated and saved successfully!");

      // Call the parent component's onCalculateSalary callback with the new salary data
      onCalculateSalary(response.data);

      // Optionally, you can reset the form after submission
      setFormData({
        employee_id: "",
        month: "",
        year: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const validateForm = async (data) => {
    const errors = {};

    // Validate employee ID
    if (!data || !data.employee_id) {
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

    // Validate month and year
    if (!data || !data.month || !data.year) {
      errors.date = "Month and year are required.";
    } else {
      // Validate that the provided month and year are not in the future
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
      const currentYear = new Date().getFullYear();
      if (Number(data.year) > currentYear || (Number(data.year) === currentYear && Number(data.month) > currentMonth)) {
        errors.date = "Invalid month and year.";
      }
    }

    return errors;
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employee_id" className="form-label">Employee ID:</label>
          <input
            type="number"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className={`form-control ${errors.employee_id ? 'is-invalid' : ''}`}
            required
          />
          {errors.employee_id && <div className="invalid-feedback">{errors.employee_id}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="month" className="form-label">Month:</label>
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            required
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            required
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Calculate Salary</button>
      </form>
    </div>
  );
};

export default SalaryForm;
