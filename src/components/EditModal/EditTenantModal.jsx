import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
        dispatch ({
            type: 'UPDATE_TENANT',
            payload: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            }
        });
    }

    // if show equal false, show nothing
    if (!props.show) {
        return null
    }

    // show this div if show equal true
    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
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
                <div className="modal-footer">
                    <button onClick={props.onClose}>close modal</button>
                </div>
            </div>

        </div>
    )
}

export default EditTenantModal;