import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MaskedInput from 'react-text-mask';
import CurrencyInput from './CurrencyInput';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import PropTypes from 'prop-types';
import './BookingForm.css';

// npm install @mui/x-date-pickers
// npm install @mui/material @emotion/react @emotion/styled
// npm install dayjs --save
// npm i react-text-mask --save
//npm i text-mask-addons --save
// npm i prop-types

const BookingForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [costPerNight, setCostPerNight] = useState(0);

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

                <form key="booking-form" onSubmit={onSubmit}>

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
                            
                            <MaskedInput
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
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
                    </div> {/* end of tenant-container */}
                        
                    <div className="tenant-input-date-div">
                        <div className="date-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={'check-in'}
                                    value={checkIn}
                                    onChange={(newValue) => setCheckIn(newValue)}
                                    showDaysOutsideCurrentMonth
                                />
                            </LocalizationProvider>
                        </div>
                    
                        <div className="date-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  
                                    label={'check-out'}
                                    value={checkOut}
                                    onChange={(newValue) => setCheckOut(newValue)}
                                    showDaysOutsideCurrentMonth
                                />
                            </LocalizationProvider>
                        </div>
                    </div> {/* end of tenant-input-date-div */}

                    <div className="section-header">
                        Financial
                    </div>

                    <div className="financial-container">
                        <div className="financial-input-div">
                            <label className="label" htmlFor="cost-per-night">Cost Per Night</label>

                            <CurrencyInput
                                key="currency-input"
                                placeholder="$0.00" 
                                type="text"
                                id="cost-per-night"
                                name="cost-per-night"
                                value={costPerNight}
                                required
                                className="financial-input"
                                onChange={(event) => setCostPerNight(event.target.value)}
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
                    </div> {/* end of tenant-container */}


                </form>
            </div>
    )
};

export default BookingForm;