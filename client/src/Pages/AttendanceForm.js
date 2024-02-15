import React, { useState } from "react";
import Navbar from '../Components/Navbar';


const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    hours_worked: "",
    leave_taken: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const validationErrors = await validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make a POST request to your backend server
      const response = await fetch("/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit attendance");
      }

      // Optionally, you can handle the successful submission here
      console.log("Attendance submitted successfully!");

      // Optionally, you can reset the form after submission
      setFormData({
        employee_id: "",
        date: "",
        hours_worked: "",
        leave_taken: false,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const validateForm = async (data) => {
    const errors = {};

    // Validate employee ID
    if (!data.employee_id) {
      errors.employee_id = "Employee ID is required.";
    } else {
      // Validate that the employee with the provided ID exists
      setLoading(true);
      try {
        const response = await fetch(`/employees/${data.employee_id}`);
        if (!response.ok) {
          errors.employee_id = "Employee with this ID does not exist.";
        }
      } catch (error) {
        console.error("Error checking employee existence:", error);
        errors.employee_id = "Error checking employee existence.";
      } finally {
        setLoading(false);
      }
    }

    // Validate date
    if (!data.date) {
      errors.date = "Date is required.";
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      if (data.date > currentDate) {
        errors.date = "Attendance date cannot be in the future.";
      }
    }

    // Validate hours worked
    if (isNaN(data.hours_worked) || data.hours_worked < 0 || data.hours_worked > 9) {
      errors.hours_worked = "Invalid hours worked. It should be between 0 and 9.";
    }

    return errors;
  };

  return (
    <>
     <Navbar />
     <form onSubmit={handleSubmit}>
      <label>
        Employee ID:
        <input
          type="number"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          required
        />
        {loading && <span className="loading">Checking employee existence...</span>}
        {errors.employee_id && !loading && <span className="error">{errors.employee_id}</span>}
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </label>

      <label>
        Hours Worked:
        <input
          type="number"
          name="hours_worked"
          value={formData.hours_worked}
          onChange={handleChange}
          required
        />
        {errors.hours_worked && <span className="error">{errors.hours_worked}</span>}
      </label>

      <label>
        Leave Taken:
        <select
          name="leave_taken"
          value={formData.leave_taken}
          onChange={handleChange}
        >
          <option value={false}>False</option>
          <option value={true}>True</option>
        </select>
      </label>

      <button type="submit">Submit Attendance</button>
    </form>
   </>
  );
};

export default AttendanceForm;