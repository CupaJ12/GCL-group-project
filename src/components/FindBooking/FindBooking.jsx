import React, { useState } from "react";
import { useSelector } from "react-redux";
import './FindBooking.css';
import BookingsFolder from "../BookingsFolder/BookingsFolder";
import { useHistory } from "react-router-dom";
// import EditTenantModal from "../EditModal/EditTenantModal";
// import EditFinancialModal from "../EditFinancialModal/EditFinancialModal";


function FindBooking() {
// [search, setSearch] = useState('');

    const history = useHistory();

    return (
        <div className="find-booking-container">
            <div className="title">Find Bookings</div>
            <input className="searchbar" placeholder="search first name, last name, property, or date" onChange={(e) => setSearch(e.target.value)} ></input>
            <br></br>
            <button className="label">SEARCH</button>
            <div className="section-header">Results...</div>
                <div>
                    <BookingsFolder />
                    {/* last 10 bookings */}
                </div>
            <button className="back-btn" onClick={() => history.push('/')}>HOME</button>
        </div>
    )
}

export default FindBooking;