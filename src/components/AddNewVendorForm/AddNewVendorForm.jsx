import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import './AddVendorForm.css';

const AddNewVendorForm = ({ modalVisible, onClose }) => {
    const [vendorName, setVendorName] = useState('');
    const [change, setChange] = useState(0);
    const dispatch = useDispatch();
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        checkFormComplete();
    }, [vendorName]);

    const cancel = () => {
        console.log('you clicked cancel');
    };

    const checkFormComplete = () => {
        if (vendorName.length > 0) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    };

    const onSubmit = () => {
        event.preventDefault();
        dispatch({
            type: 'POST_NEW_VENDOR',
            payload: vendorName
        });
    };

    return ReactDOM.createPortal(
        <CSSTransition
            in={modalVisible}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className={`modal ${modalVisible ? 'visible' : ''}`} >
                <div className="vendor-form-container">
                    
                    <form key="add-vendor-form" onSubmit={onSubmit}>

                        <div className="section-header">
                            Add Vendor
                        </div>

                        <div className="vendor-name-container">
                            <div className="vendor-input-div">
                                <label className="label" htmlFor="vendor-name">Vendor Name</label>
                                <br />
                                <input
                                    id="vendor-name"
                                    name="vendor-name"
                                    type="text"
                                    value={vendorName}
                                    placeholder="vendor name"
                                    required
                                    className="vendor-input"
                                    onChange={(event) => setVendorName(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="nav-btn-div">
                            <button 
                                type="submit"
                                className="submit-btn"
                                disabled={submitDisabled}
                            >
                                SUBMIT
                            </button>

                            <button 
                                type="button"
                                className="cancel-btn"
                                onClick={onClose}
                            >
                                CANCEL
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    );
};

export default AddNewVendorForm;