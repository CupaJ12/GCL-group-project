import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import AddNewPropertyForm from '../AddNewPropertyForm/AddNewPropertyForm';
import './ModalChild.css';

function ModalChild({ onClose, show }) {
    // ReactDOM.createPortal create the div outside of the parent so it won't break the parent's css
    return ReactDOM.createPortal(
        // CSSTransition is a built-in method that render or remove the div into the DOM
        // npm install react-transition-group, to use this built-in method
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className={`modal ${show ? 'show' : ''}`} >
                <div className="modal-content">
                    {/* modal header, for x button (optional) */}
                    <div className="modal-header">
                        <button className="close-modal-btn" onClick={onClose}>
                            X
                        </button>
                    </div>
                    {/* modal body, render anything you want in this div */}
                    
                        <AddNewPropertyForm />
                    
                    <div className="modal-footer">
                        <p>Modal footer goes here</p>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    )
};

export default ModalChild;