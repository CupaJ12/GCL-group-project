import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './BookingForm.css';

// npm install @mui/x-date-pickers
// npm install @mui/material @emotion/react @emotion/styled
// npm install dayjs --save

const BookingForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    const addAProperty = () => {
        return (
        console.log('you clicked add a property with checkin: ', checkIn)
        
        )
    };


    const onSubmit = () => {
        return (
            console.log('you clicked submit')
        );
    };

    return (
        
            <div className="booking-form-container">
                <div className="property-select-container">
                    <select className="property-dropdown">
                        <option value="goldClaimLodge">Gold Claim Lodge</option>
                    </select>
                    <button className="add-property-btn" onClick={addAProperty}>+</button>
                </div>

                <div className="section-header">
                    Tenant
                </div>
                <form onSubmit={onSubmit}>
                    <div className="tenant-container">
                        <div className="tenant-input-div">
                            <label className="label" htmlFor="first-name">First Name</label>
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                value={firstName}
                                placeholder="first name"
                                required
                                className="tenant-input"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>

                        <div className="tenant-input-div">
                            <label className="label" htmlFor="last-name">Last Name</label>
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                value={lastName}
                                placeholder="last name"
                                required
                                className="tenant-input"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>

                        <div className="tenant-input-div">
                            <label className="label" htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                value={phone}
                                placeholder="phone (optional)"
                                className="tenant-input"
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>

                        <div className="tenant-input-div">
                            <label className="label" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                placeholder="email (optional)"
                                className="tenant-input"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        
                        <div className="tenant-input-div">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  
                                    label={'check-in'}
                                    value={checkIn}
                                    onChange={(newValue) => console.log(newValue)}
                                    showDaysOutsideCurrentMonth
                                    
                                    // onChange={(event) => setCheckIn(event.target.value)}
                                    
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="tenant-input-div">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  
                                    label={'check-out'}
                                    value={checkOut}
                                    onChange={(newValue) => console.log(newValue)}
                                    showDaysOutsideCurrentMonth
                                    
                                    // onChange={(event) => setCheckIn(event.target.value)}
                                    
                                />
                            </LocalizationProvider>
                        </div>

                    </div> {/* end of tenant-container */}
                </form>
            </div>
    )
};

export default BookingForm;