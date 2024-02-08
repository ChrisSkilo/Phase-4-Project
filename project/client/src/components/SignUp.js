import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div>
      <h1>PAYROLL MANAGEMENT SYSTEM</h1>
      {/* image  */}
      <p>PLEASE ENTER SIGN UP DETAILS</p>
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
        {/*  more fields for SignUp */}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      {/*link to homepage */}
      <p>Go to <Link to="/home">Home</Link></p>
    </div>
  );
};

export default SignUp;