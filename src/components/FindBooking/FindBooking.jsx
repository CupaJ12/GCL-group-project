import React, { useState } from "react";
import { useSelector } from "react-redux";
import './FindBooking.css';
// import EditTenantModal from "../EditModal/EditTenantModal";
// import EditFinancialModal from "../EditFinancialModal/EditFinancialModal";


function FindBooking() {

    return (
        <div className="find-booking-container">
            <div className="title">Find Bookings</div>
            <input className="searchbar" placeholder="search first name, last name, property, or date"></input>
            <br></br>
            <button className="label">SEARCH</button>
            <div className="section-header">Results...</div>
                <div>
                    {/* last 10 bookings */}
                </div>
            <button className="back-btn">BACK</button>
        </div>
    )
}

export default FindBooking;