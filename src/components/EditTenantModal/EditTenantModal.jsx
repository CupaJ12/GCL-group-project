import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import MaskedInput from "react-text-mask";
import CancelValidation from '../CancelValidationModal/CancelValidationModal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './EditTenantModal.css';
function EditTenantModal(props) {
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [change, setChange] = useState(0);  


    const dispatch = useDispatch();
    // fetched booking info
    const booking = props.booking;
    //phone input masking
    // set tenant info so it can show up in inputs
    useEffect(() => {
        {
            props.booking.map((booking) => {
                setFirstName(booking.firstName),
                    setLastName(booking.lastName),
                    setEmail(booking.email),
                    setPhone(booking.phone)
            })
        };
    }, []);

    useEffect(() => {
        setCancelModalVisible(false);
    }, [props.show]);

    // dispatch updated inputs to updateTenant saga
    const saveTenant = () => {
        console.log('submit clicked');
        dispatch({
            type: 'UPDATE_TENANT',
            payload: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            }
        });
    };
    // ReactDOM.createPortal create the div outside of the parent so it won't break the parent's css
    return ReactDOM.createPortal(
        // CSSTransition is a built-in method that render div into or remove the div into the DOM
        // npm install react-transition-group, to use this built-in method
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 50, exit: 200 }}
        >
            <div className="modal">
                <div className="property-form-container">
                    {/* <div className="modal-header"> */}
                    {/* <button className="close-modal-btn" onClick={props.onClose}>
                            X
                        </button> */}
                    {/* </div> */}
                    <form className="edit-tenant-form" onSubmit={saveTenant}>
                        <div className="section-header">
                            Edit Tenant
                        </div>
                        <div className="edit-tenant-container">
                            <div className="modal-input-div">
                                <label className="label" htmlFor="first-name">
                                    First Name:
                                    <input
                                        className="tenant-input"
                                        type="text"
                                        name="first-name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label" htmlFor="last-name">
                                    Last Name:
                                    <input
                                        className="tenant-input"
                                        type="text"
                                        name="last-name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label" htmlFor="email">
                                    Email:
                                    <input
                                        className="tenant-input"
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label" htmlFor="phone">Phone:</label>
                                <MaskedInput
                                    className="tenant-input"
                                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    placeholder="phone (optional)"
                                    // disabled={feesFinalized}
                                    // className="tenant-input"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="tenant-input-date-div">
                                <div className="date-picker">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={'check-in *'}
                                            value={checkIn}
                                            onChange={(newValue) => { setCheckIn(newValue); setChange(change + 1) }}
                                            showDaysOutsideCurrentMonth
                                            // disabled={feesFinalized}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="date-picker">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={'check-out *'}
                                            value={checkOut}
                                            onChange={(newValue) => { setCheckOut(newValue); setChange(change + 1) }}
                                            showDaysOutsideCurrentMonth
                                            // disabled={feesFinalized}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="nav-btn-div">
                                <button
                                    type="submit"
                                    className="submit-btn"
                                >
                                    SUBMIT
                                </button>
                                <button
                                    type="button"
                                    className="cancel-add-property-btn"
                                    onClick={() => setCancelModalVisible(true)}
                                >
                                    CANCEL
                                </button>
                                <CancelValidation show={cancelModalVisible} onConfirm={props.onClose} onDeny={() => setCancelModalVisible(false)} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    )
}
export default EditTenantModal;