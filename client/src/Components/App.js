<<<<<<< HEAD:project/client/src/Components/App.js
// Import necessary components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

>>>>>>> main:client/src/Components/App.js
import EmployeeForm from '../Pages/EmployeeForm';
import EmployeeList from '../Pages/EmployeeList';
import AttendanceForm from '../Pages/AttendanceForm';
import PayrollForm from '../Pages/PayrollForm';
import PayrollList from '../Pages/PayRollList';
<<<<<<< HEAD:project/client/src/Components/App.js
import SalaryList from '../Pages/SalaryList';
import Home from '../Pages/Home';
import SalaryForm from '../Pages/SalaryForm'; // Import SalaryForm component
=======

import SalaryList from '../Pages/SalaryList';
import Home from '../Pages/Home';
>>>>>>> main:client/src/Components/App.js

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
<<<<<<< HEAD:project/client/src/Components/App.js
          <Route path="/salary-list" element={<SalaryList />} />
          <Route path="/salary-form" element={<SalaryForm />} /> {/* Add this line for SalaryForm */}
=======
          
          <Route path="/salary-list" element={<SalaryList />} />
>>>>>>> main:client/src/Components/App.js
        </Routes>
      </div>
    </Router>
  );
};

<<<<<<< HEAD:project/client/src/Components/App.js
export default App;



=======
export default App;
>>>>>>> main:client/src/Components/App.js
