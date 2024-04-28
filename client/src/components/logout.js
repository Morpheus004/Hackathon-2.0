import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import classes from './logoutcss.css'; // Import CSS module for styling

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token and expiration date from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('orderId');

    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <div className={classes.logoutContainer}>
      <div className={classes.logoutContent}>
        <h1 className={classes.logoutHeading}>Are you sure you want to logout?</h1>
        <div className={classes.buttonContainer}>
          <button className={`${classes.button} ${classes.logoutButton}`} onClick={handleLogout}>Logout</button>
          <button className={`${classes.button} ${classes.stayButton}`} onClick={() => redirect('/')}>Stay</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
