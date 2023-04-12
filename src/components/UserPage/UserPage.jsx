import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      
      <div>

        <Link className="submit-btn" to="/findBooking">
          FIND BOOKINGS
        </Link>

        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>

        <Link className="submit-btn" to="/bookingform">
          ADD BOOKING
        </Link>
      </div>

      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>

      <LogOutButton className="btn" />

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
