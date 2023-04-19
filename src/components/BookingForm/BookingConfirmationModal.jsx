import React from "react";
import { useHistory } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import '../CancelValidationModal/CancelValidationModal.css';

const BookingConfirmationModal = ({ onConfirm, show }) => {
    const history = useHistory();

    // ReactDOM.createPortal create the div outside of the parent so it won't break the parent's css
    return ReactDOM.createPortal(
        // CSSTransition is a built-in method that render or remove the div into the DOM
        // npm install react-transition-group, to use this built-in method
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal">

                <div className="booking-confirmation-container">
                    <h1>New booking created!</h1>
                    
                    <div className="cancel-validation-btn"><button className="add-another-booking-btn" onClick={onConfirm}>Add Another Booking</button></div>
                    <div className="cancel-validation-btn"><button className="home-btn" onClick={() => history.push('/')}>Home</button></div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    )
};

export default BookingConfirmationModal;