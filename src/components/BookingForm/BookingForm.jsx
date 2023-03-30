import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MaskedInput from 'react-text-mask';
import CurrencyInput from './CurrencyInput';
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
    const [costPerNight, setCostPerNight] = useState('');
    const [petFees, setPetFees] = useState('');
    const [cleaningFees, setCleaningFees] = useState('');
    const [lodgingTax, setLodgingTax] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [change, setChange] = useState(0);

    useEffect(() => {
        checkFormComplete();
    }, [change])

    // Number(costPerNight.replace(/[^0-9.]/g, ''));  - - - removes all special characters EXCEPT for numbers and decimal and converts to an integer
    const grossBookingAmount = (Number(costPerNight.replace(/[^0-9.]/g, ''))) + (Number(petFees.replace(/[^0-9.]/g, ''))) + (Number(cleaningFees.replace(/[^0-9.]/g, ''))) + (Number(lodgingTax.replace(/[^0-9.]/g, '')));

    const addAProperty = () => {
        return (
        console.log('you clicked add a property with checkin: ', checkIn)
        )
    };

    const onSubmit = () => {
        return (
            console.log('you clicked submit')
        )
    };

    const checkFormComplete = () => {
        if (firstName.length > 0 && lastName.length > 0 && checkIn != null && checkOut != null && checkOut > checkIn && costPerNight.length > 0 && cleaningFees.length > 0 && lodgingTax.length > 0) {
            setSubmitDisabled(false);
            console.log('first name: ', firstName)
        } else {
            setSubmitDisabled(true);
        }
    };

    return (
        <div className="booking-form-container">
            
            <div className="property-select-container">
                <select className="property-dropdown">
                    <option value="goldClaimLodge">Gold Claim Lodge</option>
                </select>
                <button className="add-property-btn" onClick={addAProperty}>+</button>
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
                            onChange={(event) => {setFirstName(event.target.value); setChange(change)}}
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
                            onChange={(event) => {setLastName(event.target.value); setChange(change)}}
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
                            onChange={(event) => {setPhone(event.target.value); setChange(change)}}
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
                            onChange={(event) => {setEmail(event.target.value); setChange(change)}}
                        />
                    </div>
                </div> {/* end of tenant-container */}
                    
                <div className="tenant-input-date-div">
                    <div className="date-picker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={'check-in'}
                                value={checkIn}
                                onChange={(newValue) => {setCheckIn(newValue); setChange(change)}}
                                showDaysOutsideCurrentMonth
                            />
                        </LocalizationProvider>
                    </div>
                
                    <div className="date-picker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker  
                                label={'check-out'}
                                value={checkOut}
                                onChange={(newValue) => {setCheckOut(newValue); setChange(change)}}
                                showDaysOutsideCurrentMonth
                            />
                        </LocalizationProvider>
                    </div>
                    {(checkOut < checkIn && checkOut != null && checkIn != null) &&
                        <h3 className="alert" role="alert">Check-out date must come after check-in date!</h3>
                    }
                </div> {/* end of tenant-input-date-div */}

                <div className="section-header">
                    Financial
                </div>

                <div className="financial-container">
                    <div className="financial-input-div">
                        <label className="label" htmlFor="cost-per-night">Cost Per Night</label>

                        <CurrencyInput
                            key="currency-input-cost-per-night"
                            placeholder="$0.00" 
                            type="text"
                            id="cost-per-night"
                            name="cost-per-night"
                            value={costPerNight}
                            required
                            className="financial-input"
                            onChange={(event) => {setCostPerNight(event.target.value); setChange(change)}}
                        />

                <div className="financial-container">
                    <div className="financial-input-div">
                        <label className="label" htmlFor="cost-per-night">Cost Per Night</label>

                        <CurrencyInput
                            key="currency-input-cost-per-night"
                            placeholder="$0.00" 
                            type="text"
                            id="cost-per-night"
                            name="cost-per-night"
                            value={costPerNight}
                            required
                            className="financial-input"
                            onChange={(event) => {setCostPerNight(event.target.value); setChange(change)}}
                        />

                    </div>

                    <div className="financial-input-div">
                        <label className="label" htmlFor="pet-fees">Pet Fees</label>

                        <CurrencyInput
                            key="currency-input-pet-fees"
                            placeholder="$0.00 (optional)" 
                            type="text"
                            id="pet-fees"
                            name="pet-fees"
                            value={petFees}
                            className="financial-input"
                            onChange={(event) => {setPetFees(event.target.value); setChange(change)}}
                        />
                    </div>

                    <div className="financial-input-div">
                        <label className="label" htmlFor="cleaning-fees">Cleaning Fees</label>
                        
                        <CurrencyInput
                            key="currency-input-cleaning-fees"
                            placeholder="$0.00" 
                            type="text"
                            id="cleaning-fees"
                            name="cleaning-fees"
                            value={cleaningFees}
                            required
                            className="financial-input"
                            onChange={(event) => {setCleaningFees(event.target.value); setChange(change)}}
                        />
                    </div>

                    <div className="financial-input-div">
                        <label className="label" htmlFor="lodging-tax">Lodging Tax</label>

                        <CurrencyInput
                            key="currency-input-lodging-tax"
                            placeholder="$0.00" 
                            type="text"
                            id="lodging-tax"
                            name="lodging-tax"
                            value={lodgingTax}
                            required
                            className="financial-input"
                            onChange={(event) => {setLodgingTax(event.target.value); setChange(change)}}
                        />
                    </div>

                </div> {/* end of financial-container */}
                
                {grossBookingAmount > 0 && 
                    <div className="gross-booking-amount">
                        <h2 className="financial-headers">Gross Booking Amount</h2>
                        <div className="money-total">
                            ${grossBookingAmount.toFixed(2)} {/* potential rounding descrepancies when youre trying to round a number thats exactly half way between two numbers */}
                        </div>
                    </div>
                }

                <hr className="rounded"/>



                <button disabled={submitDisabled}>SUBMIT</button>

            </form>
        </div>
    )
};

export default BookingForm;