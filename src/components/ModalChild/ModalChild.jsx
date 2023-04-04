import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import './ModalChild.css';


function EditTenantModal(props) {
    // ReactDOM.createPortal create the div outside of the parent so it won't break the parent's css
    return ReactDOM.createPortal(
        // CSSTransition is a built-in method that render or remove the div into the DOM
        // npm install react-transition-group, to use this built-in method
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 50, exit: 200 }}
        >
            <div className="modal" >
                <div className="modal-content">
                    {/* modal header, for x button (optional) */}
                    <div className="modal-header">
                        <button className="close-modal-btn" onClick={props.onClose}>
                            X
                        </button>
                    </div>
                    {/* modal body, render anything you want in this div */}
                    <div className="modal-body">
                        <h1>Render anything here! Forms, list, buttons, etc.</h1>
                    </div>
                    <div className="modal-footer">
                        <p>Modal footer goes here</p>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    )
};

export default EditTenantModal;