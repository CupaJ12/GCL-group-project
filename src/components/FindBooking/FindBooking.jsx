import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './FindBooking.css';
import BookingsFolder from "../BookingsFolder/BookingsFolder";
import { useHistory } from "react-router-dom";
// import EditTenantModal from "../EditModal/EditTenantModal";
// import EditFinancialModal from "../EditFinancialModal/EditFinancialModal";


function FindBooking() {
    useEffect(() => {
        window.scrollTo(0, 0)
	}, []);

    const history = useHistory();

    return (
        <div className="find-booking-container">
            <button className="back-btn" onClick={() => history.push('/')}>HOME</button>
            <br />
            <input className="searchbar" placeholder="search first name, last name, property, or date"></input>
            <br></br>
            <button className="search-btn">SEARCH</button>
            <div className="section-header">Recently Entered Bookings</div>
                <BookingsFolder />
        </div>
    )
}

export default FindBooking;