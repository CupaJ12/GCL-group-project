import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Math Component needs two prop values to work - "booking" which needs to be the booking object from the DB, and "type" which needs to be one of two string values - 'gross' or 'net'
const MathComponent = (props) => {
    const [grossBookingAmount, setGrossBookingAmount] = useState(0);
    const [netPayout, setNetPayout] = useState(0);
    const [rentalCost, setRentalCost] = useState(0);
    const checkIn = new Date(props.booking.check_in_date); // converts check in date from string to date
    const checkOut = new Date(props.booking.check_out_date); // converts check out date from string to date

    //calculates rental cost amount whenever booking value changes
    useEffect(() => { 
        calculateRentalCost();
    }, [props.booking]);

    // calculates gross whenever rentalCost value is set
    useEffect(() => { 
        calculateGross();
    }, [rentalCost]);

    // function to figure out total rental cost - 
    const calculateRentalCost = () => {
        if (checkIn != null && checkOut != null && checkOut.getTime() > checkIn.getTime()) { // checks for null values and that checkout date is after checkin date

            // .getTime() converts to date to milliseconds since jan 1 1970 at midnight, divide 1000 to get number of seconds, divide by 60 to get minutes, then 60 to get hours, then 24 to get days    
            let numberOfNights = (((((checkOut.getTime() - checkIn.getTime()) / 1000) / 60 ) /60 ) / 24);

            // converts cost to number, removes any character that isnt integer or decimal, multiplies by number of nights
            setRentalCost((Number(props.booking.cost_per_night.replace(/[^0-9.]/g, ''))) * numberOfNights);
        }; 
    };

    const calculateGross = () => {
        if (!props.booking.tax_responsible && rentalCost > 0) {  
            let grossBookingAmount = rentalCost + (Number(props.booking.pet_fee.replace(/[^0-9.]/g, ''))) + (Number(props.booking.cleaning_fee.replace(/[^0-9.]/g, ''))) + (Number(booking.lodging_tax.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(props.booking.vendor_commission.replace(/[^0-9.]/g, ''))) + (Number(props.booking.vendor_fee.replace(/[^0-9.]/g, ''))) + (Number(props.booking.discount.replace(/[^0-9.]/g, '')));
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        }
        else if (props.booking.tax_responsible && rentalCost > 0) {
            let grossBookingAmount = rentalCost + rentalCost + (Number(props.booking.pet_fee.replace(/[^0-9.]/g, ''))) + (Number(props.booking.cleaning_fee.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(props.booking.vendor_commission.replace(/[^0-9.]/g, ''))) + (Number(props.booking.vendor_fee.replace(/[^0-9.]/g, ''))) + (Number(props.booking.discount.replace(/[^0-9.]/g, ''))) + (Number(props.booking.lodging_tax.replace(/[^0-9.]/g, '')));
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        };    
    };

    // conditional on return to show which math value to return - dependendant on "type" prop
    if (props.type === 'net') {
        return netPayout.toFixed(2);
    } else 
    if (props.type === 'gross') {
        return grossBookingAmount.toFixed(2);
    }
};

export default MathComponent;