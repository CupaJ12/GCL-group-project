import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import CancelValidation from '../CancelValidationModal/CancelValidationModal';

import './EditFinancialModal.css';



function EditFinancialModal(props) {
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [costPerNight, setCostPerNight] = useState('');
    const [cleaningFee, setCleaningFee] = useState('');
    const [petFee, setPetFee] = useState('');
    const [taxResponsibility, setTaxResponsibility] = useState('');
    const [vendorCommission, setVendorCommission] = useState('');
    const [vendorFee, setVendorFee] = useState('');
    const [discount, setDiscount] = useState('');
    const [lodgingTax, setLodingTax] = useState('');
    const [finalized, setFinalized] = useState('');

    const dispatch = useDispatch();

    // fetched booking info
    const booking = props.booking;

    //phone input masking


    // set tenant info so it can show up in inputs
    useEffect(() => {
        {
            props.booking.map((booking) => {

            })
        };
    }, []);

    // dispatch updated inputs to updateTenant saga
    const saveFinancial = () => {
        console.log('submit clicked');
        dispatch({
            type: 'UPDATE_TENANT',
            payload: {

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
                <div className="property-form-container">
                    {/* <div className="modal-header">
                        <button className="close-modal-btn" onClick={props.onClose}>
                            X
                        </button>
                    </div> */}
                    <form className="edit-tenant-form">
                        <div className="section-header">
                            Edit Financial
                        </div>
                        <div className="edit-tenant-container">
                            <div className="modal-input-div">
                                <label className="label">
                                    Cost per night:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Cleaning Fee:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Pet Fee:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Lodging Tax:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Vendor:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Vendor Commission:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Vendor Fee:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="modal-input-div">
                                <label className="label">
                                    Discount:
                                    <input
                                        className="financial-input"
                                    />
                                </label>
                            </div>
                            <div className="nav-btn-div">
                                <button
                                    type="submit"
                                    className="submit-btn"
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
                                <CancelValidation show={cancelModalVisible} onConfirm={props.onClose} onDeny={() => setCancelModalVisible(false)} />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </CSSTransition >,
        document.getElementById('react-root')
    )
}

export default EditFinancialModal;