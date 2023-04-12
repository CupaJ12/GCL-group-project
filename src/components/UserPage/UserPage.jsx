import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './UserPage.css';

function UserPage() {
  const history = useHistory();
  const user = useSelector((store) => store.user);

  if (user.approved) {
    return (
      
      <div className="container">
        <p className="approved-header">
          You're currently logged in as 
          <br />
          <b>{user.username}</b>
        </p>
        <div className="main-nav">
          <button 
            className="main-nav-add-btn"
            onClick={() => history.push('/bookingform')}
          >
            Add Booking
          </button>
          <br />
          <button 
            className="main-nav-find-btn"
            onClick={() => history.push('/findBooking')}
          >
            Find Booking
          </button>
        </div>

        <div className="logout-div">
          <LogOutButton className="logout-btn" />
        </div>

      </div>
    )
  } else {
    return (
    <div className="main-unapproved-div">
        You're logged in as {user.username} 
      <h3 className="not-approved-header">
        Your account is currently awaiting approval
      </h3>
    </div>
    )
  }
};

// this allows us to use <App /> in index.js
export default UserPage;
