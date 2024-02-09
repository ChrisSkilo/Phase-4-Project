import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../../client/src/components/Login';
import SignUp from '../../client/src/components/SignUp';
import HomePage from '../../client/src/components/HomePage';
import AddEmployee from '../../client/src/components/AddEmployee';
import EmployeesList from '../../client/src/components/EmployeesList';
import Attendance from '../../client/src/components/Attendance';
import Payroll from '../../client/src/components/Payroll';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees-list" element={<EmployeesList />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll" element={<Payroll />} />
        

        

      </Routes>
    </Router>
  );
};

export default App;