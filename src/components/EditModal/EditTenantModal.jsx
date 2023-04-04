import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import './EditModal.css';


function EditTenantModal(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();

    // fetched booking info
    const booking = props.booking;

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
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="close-modal-btn" onClick={props.onClose}>
                            X
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="edit-tenant-form" onSubmit={saveTenant}>
                            <div>
                                <label htmlFor="first-name">
                                    First Name:
                                    <input
                                        type="text"
                                        name="first-name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="last-name">
                                    Last Name:
                                    <input
                                        type="text"
                                        name="last-name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="email">
                                    Email:
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="phone">
                                    Phone:
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </label>
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    )
}

export default EditTenantModal;