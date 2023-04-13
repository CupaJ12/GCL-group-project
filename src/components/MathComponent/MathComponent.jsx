import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MathComponent = ({ booking, type }) => {
    const [change, setChange] = useState(0);
    const [grossBookingAmount, setGrossBookingAmount] = useState(0);
    const [netPayout, setNetPayout] = useState(0);
    const [rentalCost, setRentalCost] = useState(0);
    const checkIn = new Date(booking.check_in_date);
    const checkOut = new Date(booking.check_out_date);

    console.log('in math component with booking: ', booking);


    //calculates rental cost & gross booking amount whenever booking value changes
    useEffect(() => { 
        calculateRentalCost();
    }, [booking]);

    useEffect(() => { 
        calculateRentalCost();
    }, [booking.check_in_date]);

    useEffect(() => { 
        calculateGross();
    }, [rentalCost]);

    //function to figure out total rental cost - 
    const calculateRentalCost = () => {
        if (checkIn != null && checkOut != null && checkOut.getTime() > checkIn.getTime()) { // checks for null values and that checkout date is after checkin date
        //.getTime() converts to date to milliseconds since jan 1 1970 at midnight, divide 1000 to get number of seconds, divide by 60 to get minutes, then 60 to get hours, then 24 to get days    
        let numberOfNights = (((((checkOut.getTime() - checkIn.getTime()) / 1000) / 60 ) /60 ) / 24);
        console.log('num of nights: ', numberOfNights);
        console.log('per night cost: ', Number(booking.cost_per_night.replace(/[^0-9.]/g, '')) * numberOfNights);
        setRentalCost((Number(booking.cost_per_night.replace(/[^0-9.]/g, ''))) * numberOfNights); //converts cost to number, removes any character that isnt integer or decimal, multiplies by number of nights
    }; 
    };

    const calculateGross = () => {
        if (!booking.tax_responsible && rentalCost > 0) {  
            let grossBookingAmount = rentalCost + (Number(booking.pet_fee.replace(/[^0-9.]/g, ''))) + (Number(booking.cleaning_fee.replace(/[^0-9.]/g, ''))) + (Number(booking.lodging_tax.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(booking.vendor_commission.replace(/[^0-9.]/g, ''))) + (Number(booking.vendor_fee.replace(/[^0-9.]/g, ''))) + (Number(booking.discount.replace(/[^0-9.]/g, '')));
            
            console.log('gross: ', typeof grossBookingAmount);
            console.log('fees owed: ', feesOwed);
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        }
        else if (booking.tax_responsible && rentalCost > 0) {
            let grossBookingAmount = rentalCost + rentalCost + (Number(booking.pet_fee.replace(/[^0-9.]/g, ''))) + (Number(booking.cleaning_fee.replace(/[^0-9.]/g, '')));
            let feesOwed = (Number(booking.vendor_commission.replace(/[^0-9.]/g, ''))) + (Number(booking.vendor_fee.replace(/[^0-9.]/g, ''))) + (Number(booking.discount.replace(/[^0-9.]/g, ''))) + (Number(booking.lodging_tax.replace(/[^0-9.]/g, '')));
            setGrossBookingAmount(grossBookingAmount);
            setNetPayout(grossBookingAmount - feesOwed);
        };    
    };
    if (type === 'net') {
        return netPayout.toFixed(2);
    } else 
    if (type === 'gross') {
        return grossBookingAmount.toFixed(2);
    }
};

export default MathComponent;