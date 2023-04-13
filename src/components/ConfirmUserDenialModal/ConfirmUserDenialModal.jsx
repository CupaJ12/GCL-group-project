import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import AddNewPropertyForm from '../AddNewPropertyForm/AddNewPropertyForm';
import './ConfirmUserDenialModal.css';

const CancelValidation = ({ onConfirm, onDeny, show }) => {

    // ReactDOM.createPortal create the div outside of the parent so it won't break the parent's css
    return ReactDOM.createPortal(
        // CSSTransition is a built-in method that render or remove the div into the DOM
        // npm install react-transition-group, to use this built-in method
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="validation-modal">

                <div className="cancel-validation-container">
                    <h1>are you sure you wish to cancel?</h1>
                    
                    <div className="cancel-validation-btn"><button className="submit-btn" onClick={onConfirm}>yes</button></div>
                    <div className="cancel-validation-btn"><button className="cancel-add-property-btn" onClick={onDeny}>no</button></div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    )
};

export default CancelValidation;