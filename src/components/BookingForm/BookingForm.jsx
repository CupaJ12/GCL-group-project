import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MaskedInput from 'react-text-mask';
import CurrencyInput from './CurrencyInput';
import { TaxToggleSwitch, FeesFinalizedToggleSwitch } from './ToggleSwitch';
import AddNewPropertyForm from '../AddNewPropertyForm/AddNewPropertyForm';
import AddNewVendorForm from '../AddNewVendorForm/AddNewVendorForm';
import CancelBookingModal from './CancelBookingModal';
import BookingConfirmationModal from './BookingConfirmationModal';
import ModalChild from '../Modal/ModalChild';
import './BookingForm.css';
// import './BookingFormResponsive.css';

// npm install @mui/x-date-pickers
// npm install @mui/material @emotion/react @emotion/styled
// npm install dayjs --save
// npm i react-text-mask --save
//npm i text-mask-addons --save
// npm i prop-types

const BookingForm = () => {
    const [bookingConfirmationModalVisible, setBookingConfirmationModalVisible] = useState(false);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [change, setChange] = useState(0);  
    const [cleaningFees, setCleaningFees] = useState('');
    const [comment, setComment] = useState(null);
    const [costPerNight, setCostPerNight] = useState('');
    const [discount, setDiscount] = useState('');
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [feesChange, setFeesChange] = useState(0);
    const feesFinalized = useSelector((store) => store.feesFinalized);
    const [firstName, setFirstName] = useState('');
    const [grossBookingAmount, setGrossBookingAmount] = useState(0);
    const history = useHistory();
    const [lastName, setLastName] = useState('');
    const [lodgingTax, setLodgingTax] = useState('');
    const [netPayout, setNetPayout] = useState(0);
    const [newItem, setNewItem] = useState(0);
    const [petFees, setPetFees] = useState('');
    const [phone, setPhone] = useState('');
    const [propertyAdded, SetPropertyAdded] = useState(false);
    const [propertyId, setPropertyId] = useState(1);
    const propertyList = useSelector((store) => store.propertyList);
    const [propertyModalVisible, setPropertyModalVisible] = useState(false);
    const [rentalCost, setRentalCost] = useState(0);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const taxResponsibility = useSelector((store) => store.taxResponsibility);
    const [vendor, setVendor] = useState('Airbnb');
    const [vendorCommissions, setVendorCommissions] = useState('');
    const [vendorFees, setVendorFees] = useState('');
    const [vendorModalVisible, setVendorModalVisible] = useState(false);
    const vendorList = useSelector((store) => store.vendorList);
    
    useEffect(() => {
        dispatch({type: 'GET_VENDORS'});
        dispatch({type: 'GET_PROPERTIES'});
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch({type: 'GET_VENDORS'});
        dispatch({type: 'GET_PROPERTIES'});
    }, [newItem]);
    
    useEffect(() => {
        checkFormComplete();
        calculateGross();
    }, [change]);

    useEffect(() => {
        checkFormComplete();
        calculateGross();
    }, [feesChange]);

    useEffect(() => {
        checkFormComplete();
        calculateGross();
    }, [taxResponsibility]);

    useEffect(() => {
        calculateRentalCost();
    }, [checkIn]);

    useEffect(() => {
        calculateRentalCost();
    }, [checkOut]);

    useEffect(() => {
        calculateRentalCost();
    }, [costPerNight]);

    const calculateRentalCost = () => {
        console.log('check in and out: ', typeof checkIn, typeof checkOut)
        if (checkIn != null && checkOut != null && checkOut > checkIn) {
            let numberOfNights = checkOut.diff(checkIn, 'days');
            setRentalCost((Number(costPerNight.replace(/[^0-9.]/g, ''))) * numberOfNights);
            setChange(change + 1);
        }; 
    };

    const calculateGross = () => {
        if (!taxResponsibility) {  
            let grossBookingAmount = rentalCost + (Number(petFees.replace(/[^0-9.]/g, ''))) + (Number(cleaningFees.replace(/[^0-9.]/g, ''))) + (Number(lodgingTax.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(vendorCommissions.replace(/[^0-9.]/g, ''))) + (Number(vendorFees.replace(/[^0-9.]/g, ''))) + (Number(discount.replace(/[^0-9.]/g, '')));
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        } 
        else if (taxResponsibility && feesChange === 0) {
            let grossBookingAmount = rentalCost + (Number(petFees.replace(/[^0-9.]/g, ''))) + (Number(cleaningFees.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(lodgingTax.replace(/[^0-9.]/g, '')));
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        }
        else if (taxResponsibility && feesChange > 0) {
            let grossBookingAmount = rentalCost + (Number(petFees.replace(/[^0-9.]/g, ''))) + (Number(cleaningFees.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(vendorCommissions.replace(/[^0-9.]/g, ''))) + (Number(vendorFees.replace(/[^0-9.]/g, ''))) + (Number(discount.replace(/[^0-9.]/g, ''))) + (Number(lodgingTax.replace(/[^0-9.]/g, '')));
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        }
    };              

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'POST_BOOKING',
            payload: {
                customer_first_name: firstName,
                customer_last_name: lastName,
                customer_email: email,
                customer_phone: phone,
                vendor: vendor,
                check_in_date: checkIn,
                check_out_date: checkOut,
                tax_responsible: taxResponsibility,
                cleaning_fee: cleaningFees,
                pet_fee: petFees,
                cost_per_night: costPerNight,
                vendor_commission: vendorCommissions,
                vendor_fee: vendorFees,
                discount,
                lodging_tax: lodgingTax,
                finalized: feesFinalized,
                comment,
                property_id: propertyId,
            }
        });
        setBookingConfirmationModalVisible(true);
    };

    const checkFormComplete = () => {
        setSubmitDisabled(
            firstName.length == 0 
            || lastName.length == 0 
            || checkIn === null 
            || checkOut === null 
            || checkOut < checkIn 
            || costPerNight.length == 0 
            || cleaningFees.length == 0 
            || lodgingTax.length == 0
            || vendorCommissions.length == 0
            || vendorFees.length == 0
        )
    };

    return (

        <div className="booking-form-container">  
            <AddNewPropertyForm modalVisible={propertyModalVisible} onClose={() => {setPropertyModalVisible(false); setNewItem(newItem + 1)}}/>
            <AddNewVendorForm modalVisible={vendorModalVisible} onClose={() => {setVendorModalVisible(false); setNewItem(newItem + 1)}}/>
            <CancelBookingModal show={cancelModalVisible} onConfirm={() => {history.push('/'); setCancelModalVisible(false)}} onDeny={() => setCancelModalVisible(false)}/>
            <BookingConfirmationModal show={bookingConfirmationModalVisible} onConfirm={() => {setBookingConfirmationModalVisible(false); history.push('/bookingform')}} />
            <form key="booking-form" onSubmit={onSubmit}>
                <section className="required">* indicates required fields</section>
                {feesFinalized &&
                    <section className="fees-finalized-disclaimer">
                        Fees are finalized and the inputs are locked. 
                        <br />
                        To update input values, please set the "Fees Finalized" toggle to "no"
                    </section>
                }
                
                <div className="property-select-container">
                    <select 
                        disabled={feesFinalized} 
                        className="property-dropdown"
                        value={propertyId} 
                        onChange={(event) => setPropertyId(event.target.value)}
                    >
                        {propertyList.map((property, index) => {
                                return (
                                    <option key={`${property.id}-${index}`} value={property.id}>{property.name}</option>
                                )
                        })}
                    </select>
                    <button type="button" className="add-property-btn" onClick={() => setPropertyModalVisible(true)}>+</button>
                </div>

                <div className="section-header">
                    Tenant
                </div>

                <div className="tenant-container">
                    <div className="tenant-input-div">
                        <label className="label" htmlFor="first-name">First Name *</label>
                        
                        <input
                            id="first-name"
                            name="first-name"
                            type="text"
                            value={firstName}
                            placeholder="first name"
                            required
                            disabled={feesFinalized}
                            className="tenant-input"
                            onChange={(event) => {setFirstName(event.target.value); setChange(change + 1)}}
                        />
                    </div>

                    <div className="tenant-input-div">
                        <label className="label" htmlFor="last-name">Last Name *</label>
                        
                        <input
                            id="last-name"
                            name="last-name"
                            type="text"
                            value={lastName}
                            placeholder="last name"
                            required
                            disabled={feesFinalized}
                            className="tenant-input"
                            onChange={(event) => {setLastName(event.target.value); setChange(change + 1)}}
                        />
                    </div>

                    <div className="tenant-input-div">
                        <label className="label" htmlFor="phone">Phone</label>
                        
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            id="phone"
                            name="phone"
                            value={phone}
                            placeholder="phone (optional)"
                            disabled={feesFinalized}
                            className="tenant-input"
                            onChange={(event) => {setPhone(event.target.value); setChange(change + 1)}}
                        />
                    </div>

                    <div className="tenant-input-div">
                        <label className="label" htmlFor="email">Email</label>
                        
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            placeholder="email (optional)"
                            disabled={feesFinalized}
                            className="tenant-input"
                            onChange={(event) => {setEmail(event.target.value); setChange(change + 1)}}
                        />
                    </div>
                </div> {/* end of tenant-container */}
                        
                <div className="tenant-input-date-div">
                    <div className="date-picker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={'check-in *'}
                                value={checkIn}
                                onChange={(newValue) => {setCheckIn(newValue); setChange(change + 1)}}
                                showDaysOutsideCurrentMonth
                                disabled={feesFinalized}
                            />
                        </LocalizationProvider>
                    </div>
                
                    <div className="date-picker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker  
                                label={'check-out *'}
                                value={checkOut}
                                onChange={(newValue) => {setCheckOut(newValue); setChange(change + 1)}}
                                showDaysOutsideCurrentMonth
                                disabled={feesFinalized}
                            />
                        </LocalizationProvider>
                    </div>

                    {(checkOut < checkIn && checkOut != null && checkIn != null) &&
                        <h3 className="alert" role="alert">Check-out date must come after check-in date!</h3>
                    }

                </div> {/* end of tenant-input-date-div */}

                <div className="section-header">
                    Financial
                </div>

                <div className="financial-container">
                    <div className="financial-input-div">
                        <label className="label" htmlFor="cost-per-night">Cost Per Night *</label>

                        <CurrencyInput
                            key="currency-input-cost-per-night"
                            placeholder="$0.00" 
                            type="text"
                            id="cost-per-night"
                            name="cost-per-night"
                            value={costPerNight}
                            required
                            disabled={feesFinalized}
                            className="financial-input"
                            onChange={(event) => {setCostPerNight(event.target.value); setChange(change + 1)}}
                        />

                    </div>

                    <div className="financial-input-div">
                        <label className="label" htmlFor="pet-fees">Pet Fees</label>

                        <CurrencyInput
                            key="currency-input-pet-fees"
                            placeholder="$0.00 (optional)" 
                            type="text"
                            id="pet-fees"
                            name="pet-fees"
                            value={petFees}
                            disabled={feesFinalized}
                            className="financial-input"
                            onChange={(event) => {setPetFees(event.target.value); setChange(change + 1)}}
                        />
                    </div>

                    <div className="financial-input-div">
                        <label className="label" htmlFor="cleaning-fees">Cleaning Fees *</label>
                        
                        <CurrencyInput
                            key="currency-input-cleaning-fees"
                            placeholder="$0.00" 
                            type="text"
                            id="cleaning-fees"
                            name="cleaning-fees"
                            value={cleaningFees}
                            required
                            disabled={feesFinalized}
                            className="financial-input"
                            onChange={(event) => {setCleaningFees(event.target.value); setChange(change + 1)}}
                        />
                    </div>

                    <div className="financial-input-div">
                        <label className="label" htmlFor="lodging-tax">Lodging Tax *</label>

                        <CurrencyInput
                            key="currency-input-lodging-tax"
                            placeholder="$0.00" 
                            type="text"
                            id="lodging-tax"
                            name="lodging-tax"
                            value={lodgingTax}
                            required
                            disabled={feesFinalized}
                            className="financial-input"
                            onChange={(event) => {setLodgingTax(event.target.value); setChange(change + 1)}}
                        />
                    </div>

                </div> {/* end of financial-container */}
                    
                {(grossBookingAmount > 0 && rentalCost > 0) &&
                    <div className="booking-amount">
                        <h2 className="financial-headers">Gross Booking Amount</h2>
                        <div className="money-total">
                            ${grossBookingAmount.toFixed(2)} {/* potential rounding descrepancies when youre trying to round a number thats exactly half way between two numbers git ad */}
                        </div>
                    </div>
                }

                <hr className="rounded"/>
                    
                <div className="vendor-container">
                    {vendorList.length > 0 &&
                        <div className="vendor-input-div">
                            <label className="label" htmlFor="vendor">Vendor *</label>
                            <br />
                            <select 
                                disabled={feesFinalized} 
                                className="vendor-dropdown"
                                value={vendor} 
                                onChange={(event) => setVendor(event.target.value)}  
                            >
                                {vendorList.map((vendor, index) => {
                                    return (
                                        <option key={`${vendor.id}-${index}`} value={vendor.name}>{vendor.name}</option>
                                    )
                                })}          
                            </select>
                            <button type="button" className="add-vendor-btn" onClick={() => setVendorModalVisible(true)}>+</button>
                        </div>
                    }

                    <div className="vendor-input-div">
                        <label className="label" htmlFor="vendor-commissions">Vendor Commissions *</label>
                        <CurrencyInput
                            key="currency-input-vendor-commissions"
                            placeholder="$0.00" 
                            type="text"
                            id="vendor-commissions"
                            name="vendor-commissions"
                            value={vendorCommissions}
                            disabled={feesFinalized}
                            className="vendor-input"
                            onChange={(event) => {setVendorCommissions(event.target.value); setFeesChange(feesChange + 1)}}
                        />
                    </div>

                    <div className="vendor-input-div">
                        <label className="label" htmlFor="vendor-fees">Vendor Fees *</label>
                        <CurrencyInput
                            key="currency-input-vendor-fees"
                            placeholder="$0.00" 
                            type="text"
                            id="vendor-fees"
                            name="vendor-fees"
                            value={vendorFees}
                            disabled={feesFinalized}
                            className="vendor-input"
                            onChange={(event) => {setVendorFees(event.target.value); setFeesChange(feesChange + 1)}}
                        />
                    </div>

                    <div className="vendor-input-div">
                        <label className="label" htmlFor="discount">Discount</label>
                        <CurrencyInput
                            key="currency-input-discount"
                            placeholder="$0.00 (optional)" 
                            type="text"
                            id="discount"
                            name="discount"
                            value={discount}
                            disabled={feesFinalized}
                            className="vendor-input"
                            onChange={(event) => {setDiscount(event.target.value); setFeesChange(feesChange + 1)}}
                        />
                    </div>
                
                    <TaxToggleSwitch feesFinalized={feesFinalized}/>
                    <FeesFinalizedToggleSwitch submitDisabled={submitDisabled}/>

                </div>
                    {(grossBookingAmount > 0 && rentalCost > 0) && 
                        <div className="booking-amount">
                            <h2 className="financial-headers">Net Payout</h2>
                            <div className="money-total">
                                ${netPayout.toFixed(2)} {/* potential rounding descrepancies when youre trying to round a number thats exactly half way between two numbers, at the thousandth decimal (54.305) */}
                            </div>
                        </div>
                    }

                    <div className="section-header">
                        Comment
                    </div>

                    <div className="comment-input-div">
                        <label className="label" htmlFor="comment">Comment</label>
                            
                        <input
                            id="comment"
                            name="comment"
                            type="text"
                            value={comment}
                            placeholder="comment (optional)"
                            className="tenant-input"
                            onChange={(event) => {setComment(event.target.value)}}
                        />
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
                        onClick={() => setCancelModalVisible(true)}
                    >
                        HOME
                    </button>
                </div>
            </form>
        </div>
    )
};

export default BookingForm;