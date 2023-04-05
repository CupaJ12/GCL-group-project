import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CancelValidation from '../CancelValidation/CancelValidation';
import './AddVendorForm.css';

const AddNewVendorForm = ({ modalVisible, onClose }) => {
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [vendorName, setVendorName] = useState('');

    useEffect(() => {
        checkFormComplete();
    }, [vendorName]);

    useEffect(() => {
        setCancelModalVisible(false);
    }, [modalVisible]);

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
            payload: {vendorName}
        });
        setVendorName('');
        history.push('/bookingform');
    };

    return ReactDOM.createPortal(
        <CSSTransition
            in={modalVisible}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            {/* <div className={`modal ${modalVisible ? 'visible' : ''}`} > */}
            <div className="modal">
                <div className="vendor-form-container">
                    
                    <form key="add-vendor-form" onSubmit={onSubmit}>

                        <div className="section-header">
                            Add Vendor
                        </div>

                        <div className="vendor-name-container">
                            <div className="vendor-input-div">
                                <label className="label" htmlFor="vendor-name">Vendor Name *</label>
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
                                className="cancel-add-property-btn"
                                onClick={() => setCancelModalVisible(true)}
                            >
                                CANCEL
                            </button>
                            <CancelValidation show={cancelModalVisible} onConfirm={onClose} onDeny={() => setCancelModalVisible(false)}/>
                        </div>

                    </form>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    );
};

export default AddNewVendorForm;