import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import CancelValidation from '../CancelValidationModal/CancelValidationModal';
import MathComponent from './EditFinancialMath'
import CurrencyInput from "../BookingForm/CurrencyInput";
import { TaxToggleSwitch, FeesFinalizedToggleSwitch } from "./EditFinancialToggleSwitch";

import './EditFinancialModal.css';



function EditFinancialModal(props) {
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [costPerNight, setCostPerNight] = useState('');
    const [cleaningFee, setCleaningFee] = useState('');
    const [petFee, setPetFee] = useState('');
    const [taxResponsibility, setTaxResponsibility] = useState(false);
    const [vendorCommission, setVendorCommission] = useState('');
    const [vendorFee, setVendorFee] = useState('');
    const [discount, setDiscount] = useState('');
    const [lodgingTax, setLodingTax] = useState('');
    const [finalized, setFinalized] = useState(false);
    const [vendor, setVendor] = useState('');
    const vendorList = useSelector((store) => store.vendorList);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [change, setChange] = useState(0);
    // const feesFinalized = useSelector((store) => store.feesFinalized);

    // const taxResponsibility = useSelector((store) => store.taxResponsibility);


    const dispatch = useDispatch();

    // fetched booking info
    const booking = props.booking;

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
        id: booking.id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        cost_per_night: costPerNight,
        cleaning_fee: cleaningFee,
        pet_fee: petFee,
        lodging_tax: lodgingTax,
        tax_responsible: taxResponsibility,
        vendor_commission: vendorCommission,
        vendor_fee: vendorFee,
        discount,
        change,
        finalized,
        vendor,

    }

    // dispatch updated inputs to updateTenant saga
    const saveFinancial = () => {
        console.log('submit clicked');
        dispatch({
            type: 'EDIT_FINANCIAL_INFO',
            payload: booking2
        });
    };

    console.log(taxResponsibility);

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
                    <form className="edit-financial-form" onSubmit={() => saveFinancial()}>
                        <div className="financial-section-header">
                            Edit Financial
                        </div>
                        <div>
                        {finalized &&
                            <section className="fees-finalized-disclaimer">
                                Fees are finalized and the inputs are locked.
                                <br />
                                To update input values, please set the "Fees Finalized" toggle to "no"
                            </section>
                        }
                        </div>
                        <div className="edit-financial-container">
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="cost-per-night">
                                    Cost per night:
                                    <CurrencyInput
                                        key="cost-per-night"
                                        placeholder="$0.00"
                                        className="financial-input"
                                        disabled={finalized}
                                        type="text"
                                        name="cost-per-night"
                                        value={costPerNight}
                                        onChange={(e) => { setCostPerNight(e.target.value); setChange(change + 1) }}
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
                                        disabled={finalized}
                                        type="text"
                                        name="cleaning-fee"
                                        value={cleaningFee}
                                        onChange={(e) => { setCleaningFee(e.target.value); setChange(change + 1) }}
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
                                        disabled={finalized}
                                        type="text"
                                        name="pet-fee"
                                        value={petFee}
                                        onChange={(e) => { setPetFee(e.target.value); setChange(change + 1) }}
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
                                        disabled={finalized}
                                        type="text"
                                        name="lodging-tax"
                                        value={lodgingTax}
                                        onChange={(e) => { setLodingTax(e.target.value); setChange(change + 1) }}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="edit-financial-booking-amount">
                            <h2 className="edit-financial-headers">Gross Amount: </h2>
                            <div className="edit-financial-money-total">
                                {<MathComponent
                                    booking2={booking2}
                                    type="gross" />}
                            </div>
                        </div>
                        <div className="financial-divider" />
                        <div className="edit-financial-container">
                            <div className="financial-modal-input-div">
                                <label className="label" htmlFor="vendor">
                                    Vendor:
                                    <select
                                        // disabled={feesFinalized} 
                                        className="financial-vendor-dropdown"
                                        disabled={finalized}
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
                                        disabled={finalized}
                                        type="text"
                                        name="vendor-commission"
                                        value={vendorCommission}
                                        onChange={(e) => { setVendorCommission(e.target.value); setChange(change + 1) }}
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
                                        disabled={finalized}
                                        type="text"
                                        name="vendor-fee"
                                        value={vendorFee}
                                        onChange={(e) => { setVendorFee(e.target.value); setChange(change + 1) }}
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
                                        disabled={finalized}
                                        type="text"
                                        name="discount"
                                        value={discount}
                                        onChange={(e) => { setDiscount(e.target.value); setChange(change + 1) }}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="edit-financial-toggle-switch">
                            <div className="toggle-div">
                                <TaxToggleSwitch
                                    taxResponsibility={taxResponsibility}
                                    setTaxResponsibility={() => { setTaxResponsibility(!taxResponsibility); setChange(change + 1) }}
                                    finalized={finalized}
                                />
                            </div>
                            <div className="toggle-div">
                                <FeesFinalizedToggleSwitch
                                    finalized={finalized}
                                    setFinalized={() => setFinalized(!finalized)}
                                />
                            </div>
                        </div>
                        <div className="edit-financial-booking-amount">
                            <h2 className="edit-financial-headers">Net Payout: </h2>
                            <div className="edit-financial-money-total">
                                {<MathComponent
                                    booking2={booking2}
                                    type="net" />}
                            </div>
                        </div>
                        <div className="financial-buttons">
                            <div className="financial-nav-btn-div">
                                <button
                                    type="submit"
                                    className="financial-submit-btn"
                                    onClick={props.onClose}
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
                        </div>
                    </form>
                </div>
            </div >
        </CSSTransition >,
        document.getElementById('react-root')
    )
}

export default EditFinancialModal;