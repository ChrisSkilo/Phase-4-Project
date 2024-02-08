import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      <img src="/images/placeholder-image.jpg" alt="Placeholder" />
       {/* <img src="/images/placeholder-image.jpg" alt="Placeholder" /> */}
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      {/* Add a link to the homepage */}
      <p>Go to <Link to="/home">Home</Link></p>
    </div>
  );
};

export default Login;