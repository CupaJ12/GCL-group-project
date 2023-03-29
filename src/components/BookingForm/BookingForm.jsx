import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './BookingForm.css';

// npm install react-select

const BookingForm = () => {

    const addAProperty = () => {
        return (
        console.log('you clicked add a property')
        )
    }

    return (
        <div className="booking-form-container">
            <h1>Booking Form</h1>
            <div className="property-select-container">
                <select className="property-dropdown">
                    <option value="goldClaimLodge">Gold Claim Lodge</option>
                </select>
                <button className="add-property-btn" onClick={addAProperty}>+</button>
            </div>
        </div>
    )
};

export default BookingForm;