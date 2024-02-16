import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/employee-form" style={styles.navLink}>Employee Form</Link></li>
        <li style={styles.navItem}><Link to="/employee-list" style={styles.navLink}>Employee List</Link></li>
        <li style={styles.navItem}><Link to="/attendance" style={styles.navLink}>Attendance</Link></li>
        <li style={styles.navItem}><Link to="/payroll-form" style={styles.navLink}>Payroll Form</Link></li>
        <li style={styles.navItem}><Link to="/payroll-list" style={styles.navLink}>Payroll List</Link></li>
        <li style={styles.navItem}><Link to="/salary-form" style={styles.navLink}>Salary Form</Link></li>
        <li style={styles.navItem}><Link to="/salary-list" style={styles.navLink}>Salary List</Link></li>
        <li style={styles.navItem}><Link to="/Home" style={styles.navLink}>Home</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    background: '#333',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;