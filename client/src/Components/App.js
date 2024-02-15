import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EmployeeForm from '../Pages/EmployeeForm';
import EmployeeList from '../Pages/EmployeeList';
import AttendanceForm from '../Pages/AttendanceForm';
import PayrollForm from '../Pages/PayrollForm';
import PayrollList from '../Pages/PayRollList';

import SalaryList from '../Pages/SalaryList';
import Home from '../Pages/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/attendance" element={<AttendanceForm />} />
          <Route path="/payroll-form" element={<PayrollForm />} />
          <Route path="/payroll-list" element={<PayrollList />} />
          
          <Route path="/salary-list" element={<SalaryList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;