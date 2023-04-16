import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import CancelValidation from '../CancelValidationModal/CancelValidationModal';
import MathComponent from './EditFinancialMath'
import CurrencyInput from "../BookingForm/CurrencyInput";

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
    const [vendor, setVendor] = useState('');
    const vendorList = useSelector((store) => store.vendorList);

    const dispatch = useDispatch();

    // fetched booking info
    const booking = props.booking;
    console.log(booking);

    useEffect(() => {
        setCostPerNight(booking.cost_per_night);
        setCleaningFee(booking.cleaning_fee);
        setPetFee(booking.pet_fee);
        setLodingTax(booking.lodging_tax);
        setTaxResponsibility(booking.tax_responsible);
        setVendorCommission(booking.vendor_commission);
        setVendorFee(booking.vendor_fee);
        setDiscount(booking.discount);
        setFinalized(booking.finalized);
        setVendor(booking.vendor);
    }, [booking]);

    // new booking to be used as prop for MathComponent
    const booking2 = {
        cost_per_night: costPerNight,
        cleaning_fee: cleaningFee,
        pet_fee: petFee,
        lodging_tax: lodgingTax,
    }

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
                <div className="financial-modal-content">
                    <form className="edit-financial-form">
                        <div className="financial-section-header">
                            <h3>Edit Financial</h3>
                        </div>
                        <div className="edit-financial-container">
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="cost-per-night">
                                    Cost per night:
                                    <CurrencyInput
                                        key="cost-per-night"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="cost-per-night"
                                        value={costPerNight}
                                        onChange={(e) => setCostPerNight(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="cleaning-fee">
                                    Cleaning Fee:
                                    <CurrencyInput
                                        key="cleaning-fee"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="cleaning-fee"
                                        value={cleaningFee}
                                        onChange={(e) => setCleaningFee(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="pet-fee">
                                    Pet Fee:
                                    <CurrencyInput
                                        key="pet-fee"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="pet-fee"
                                        value={petFee}
                                        onChange={(e) => setPetFee(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="lodging-tax">
                                    Lodging Tax:
                                    <CurrencyInput
                                        key="lodging-tax"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="lodging-tax"
                                        value={lodgingTax}
                                        onChange={(e) => setLodingTax(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <h3>
                                Gross Amount: {<MathComponent booking={booking} booking2={booking2} type="gross" />}
                            </h3>
                        </div>
                        <div className="financial-divider" />
                        <div className="edit-financial-container">
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="vendor">
                                    Vendor:
                                    <select
                                        // disabled={feesFinalized} 
                                        className="financial-vendor-dropdown"
                                        value={vendor}
                                        onChange={(event) => setVendor(event.target.value)}
                                    >
                                        {vendorList.map((vendor, index) => {
                                            return (
                                                <option key={`${vendor.id}-${index}`} value={vendor.name}>{vendor.name}</option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="vendor-commission">
                                    Vendor Commission:
                                    <CurrencyInput
                                        key="vendor-commission"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="vendor-commission"
                                        value={vendorCommission}
                                        onChange={(e) => setVendorCommission(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="vendor-fee">
                                    Vendor Fee:
                                    <CurrencyInput
                                        key="vendor-fee"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="vendor-fee"
                                        value={vendorFee}
                                        onChange={(e) => setVendorFee(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="discount">
                                    Discount:
                                    <CurrencyInput
                                        key="discount"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        type="text"
                                        name="discount"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <p>Payout:</p>
                        </div>
                        <div className="financial-nav-btn-div">
                            <button
                                type="submit"
                                className="submit-btn"
                            >
                                SUBMIT
                            </button>
                            <button
                                type="button"
                                className="cancel-add-financial-btn"
                                onClick={() => setCancelModalVisible(true)}
                            >
                                CANCEL
                            </button>
                            <CancelValidation show={cancelModalVisible} onConfirm={props.onClose} onDeny={() => setCancelModalVisible(false)} />
                        </div>
                    </form>
                </div>
            </div >
        </CSSTransition >,
        document.getElementById('react-root')
    )
}

export default EditFinancialModal;