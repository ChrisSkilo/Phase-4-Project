import React from 'react';
<<<<<<< HEAD:project/client/src/Pages/Home.js
import Navbar from '../Components/Navbar';

const Home = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.header}>Welcome to the Payroll Management System!</h2>
        <p style={styles.paragraph}>
          Efficiently manage salaries, track attendance, and streamline your payroll processes with ease.
        </p>
        <p style={styles.paragraph}>
          Your journey to efficient payroll management starts here!
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    color: '#333',
    fontSize: '2em',
    marginBottom: '15px',
  },
  paragraph: {
    color: '#555',
    fontSize: '1.2em',
    marginBottom: '10px',
  },
};

export default Home;
=======
import Navbar from '../Components/Navbar'

const Home = () => {
    return (
      <div>
        <Navbar />
        <h2>Welcome to the Payroll Management System!</h2>
        <p>Efficiently manage salaries, track attendance, and streamline your payroll processes with ease.</p>
        <p>Your journey to efficient payroll management starts here!</p>
       </div>
    
  );
};

export default Home;
>>>>>>> main:client/src/Pages/Home.js
