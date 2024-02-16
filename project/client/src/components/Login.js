import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    const username = 'HRIS2024';
    const password = '2024hris';

    if (username === 'HRIS2024' && password === '2024hris') {
      // If login is successful, navigate to the home page
      navigate('/home');
    } else {
      // If login fails, you can handle it accordingly show an error message
      console.error('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      <img src="/images/placeholder-image.jpg" alt="Placeholder" />
      <p>PLEASE ENTER LOGIN DETAILS</p>
      <form>
        <label>
          Username:
          <input type="text" placeholder="Enter username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" placeholder="Enter password" />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>Go to <Link to="/home">Home</Link></p>
    </div>
  );
};

export default Login;


