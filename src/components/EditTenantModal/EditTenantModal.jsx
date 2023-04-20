import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import MaskedInput from "react-text-mask";
import CancelValidation from '../CancelValidationModal/CancelValidationModal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';
import './EditTenantModal.css';

function EditTenantModal(props) {
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [firstName, setFirstName] = useState(props.booking.customer_first_name);
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    // const [change, setChange] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false)
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        setCancelModalVisible(false);
    }, [props.show]);


    useEffect(() => {
        setFirstName(props.booking.customer_first_name);
        setLastName(props.booking.customer_last_name);
        setEmail(props.booking.customer_email);
        setPhone(props.booking.customer_phone);
        setCheckIn(dayjs(new Date(props.booking.check_in_date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        })));
        setCheckOut(dayjs(new Date(props.booking.check_out_date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        })));
    }, [props.booking]);


    // dispatch updated inputs to updateTenant saga
    const saveTenant = () => {
        console.log('submit clicked');
        dispatch({
            type: 'EDIT_TENANT_INFO',
            payload: {
                id: props.booking.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                checkIn: checkIn,
                checkOut: checkOut
            }
        });
        props.onClose();
        props.setChange();
        location.reload();
    };


    // ReactDOM.createPortal create the div outside of the parent so it won't break the parent's css
    return ReactDOM.createPortal(
        // CSSTransition is a built-in method that render div into or remove the div into the DOM
        // npm install react-transition-group, to use this built-in method
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 50, exit: 5000 }}
        >
            <div className="modal">
                <div className="tenant-modal-content">
                    <form className="edit-tenant-form" onSubmit={() => saveTenant()} >
                        <div className="tenant-section-header">
                            Edit Tenant
                        </div>
                        <div className="edit-tenant-container">
                            <div className="tenant-modal-input-div">
                                <label className="label" htmlFor="first-name">
                                    First Name:
                                    <input
                                        className="tenant-input"
                                        type="text"
                                        name="first-name"
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value); setCanSubmit(true) }}
                                    />
                                </label>
                            </div>
                            <div className="tenant-modal-input-div">
                                <label className="label" htmlFor="last-name">
                                    Last Name:
                                    <input
                                        className="tenant-input"
                                        type="text"
                                        name="last-name"
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value); setCanSubmit(true) }}
                                    />
                                </label>
                            </div>
                            <div className="tenant-modal-input-div">
                                <label className="label" htmlFor="email">
                                    Email:
                                    <input
                                        className="tenant-input"
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setCanSubmit(true) }}
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
                                            onChange={(newValue) => { setCheckIn(newValue); setCanSubmit(true) }}
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
                                            onChange={(newValue) => { setCheckOut(newValue); setCanSubmit(true) }}
                                            showDaysOutsideCurrentMonth
                                        // disabled={feesFinalized}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                {!canSubmit &&
                                    <section className="fees-finalized-disclaimer">
                                        Change(s) need to be made before submitting, otherwise click CANCEL to close window
                                    </section>
                                }
                            </div>
                            <div className="tenant-nav-btn-div">
                                <button
                                    type="submit"
                                    className="tenant-submit-btn"
                                    disabled={!canSubmit}
                                    // onClick={props.onClose}
                                >
                                    SUBMIT
                                </button>
                                <button
                                    type="button"
                                    className="cancel-add-tenant-btn"
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