import React, { useState, useEffect } from "react";
import './EditModal.css';


function EditTenantModal(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const booking = props.booking;

    // set first and last name so it can show up in inputs
    useEffect(() => {
        { props.booking.map((booking) => { setFirstName(booking.firstName), setLastName(booking.lastName)}) }
    }, []);

    if (!props.show) {
        return null
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                        <form>
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