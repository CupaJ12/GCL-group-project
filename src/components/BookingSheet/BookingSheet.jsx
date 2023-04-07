//component for displaying a single booking.

// TODO:
// 1. make a GET request to the server to get the booking data (WIP)
// 1A. make a saga to get the booking data (✅)
// 1B. make a reducer to store the booking data (✅)

// 2. display the booking data on the DOM
// 3. make a DELETE request to the server to delete the booking
// 4. make a PUT request to the server to edit the booking
// 5. make a GET request to the server to get the comments for the booking
// 6. make a POST request to the server to add a comment to the booking
// 7. make a DELETE request to the server to delete a comment from the booking
// 8. make a PUT request to the server to edit a comment from the booking

import React from 'react';
import './BookingSheet.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookingSheet() {
	// declare constants: reducers, etc:
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const options = { year: 'numeric', month: 'long', day: 'numeric' };

	const booking = useSelector((store) => store.bookingByID);

	// const check_in_date = new Date(booking.check_in_date);
	// const check_out_date = new Date(booking.check_out_date);
	const [check_in_date, set_check_in_date] = useState(new Date());
	const [check_out_date, set_check_out_date] = useState(new Date());

	// declare functions: dispatch, history, useEffect etc:
	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKING_BY_ID', payload: id });
	}, []);

	useEffect(() => {
		set_check_in_date(new Date(booking.check_in_date));
		set_check_out_date(new Date(booking.check_out_date));
	}, [booking]);

	// declare variables: useState, etc:

	// handle functions: onClick, etc:
	
	// conditional rendering: if no booking, return loading

	if (!booking) {
		return <h1>loading...🤔</h1>;
	}

	return (
		<div className='booking-form-container'>
			<div className='property-select-container'>
				<div className='section-header'>Property</div>
				<h2>PROPERTY NAME HERE DO JOIN TABLE</h2>
			</div>
			<div className='section-header'>Tenant</div>
			<div className='tenant-container'>
				<div className='tenant-input-div'>
					<section className='label'>First Name</section>
					<section className='tenant-input'>
						{booking.customer_first_name}
					</section>
				</div>

				<div className='tenant-input-div'>
					<section className='label'>Last Name</section>
					<section className='tenant-input'>
						{booking.customer_last_name}
					</section>
				</div>

				<div className='tenant-input-div'>
					<section className='label'>Phone</section>
					<section className='tenant-input'>{booking.customer_phone}</section>
				</div>

				<div className='tenant-input-div'>
					<section className='label'>Email</section>

					<section className='tenant-input'>{booking.customer_email}</section>
				</div>

				<div className='tenant-input-div'>
					<section className='label'>Check-in Date</section>

					<section className='tenant-input'>
						{check_in_date.toLocaleDateString('en-US', options)}
					</section>
				</div>

				<div className='tenant-input-div'>
					<section className='label'>Check-out Date</section>

					<section className='tenant-input'>
						{check_out_date.toLocaleDateString('en-US', options)}
					</section>
				</div>
			</div>

			<div className='section-header'>Financial</div>
			<div className='financial-container'>
				<div className='financial-input-div'>
					<section className='label'>Cost Per Night</section>
					<section className='financial-input'>
						{booking.cost_per_night}
					</section>
				</div>

				<div className='financial-input-div'>
					<section className='label'>Pet Fees</section>
					<section className='financial-input'>{booking.pet_fee}</section>
				</div>

				<div className='financial-input-div'>
					<section className='label'>Cleaning Fees</section>
					<section className='financial-input'>{booking.cleaning_fee}</section>
				</div>

				<div className='financial-input-div'>
					<section className='label'>Lodging Tax</section>
					<section className='financial-input'>{booking.lodging_tax}</section>
				</div>
			</div>
			<div className='booking-amount'>
				<section className='label'>Gross Booking Amount</section>
				<section className='financial-input'>
					<h4>GROSS🤮 BOOKING CALC HERE</h4>
				</section>
			</div>

			<div className='vendor-container'>
				<div className='vendor-input-div'>
					<section className='label'>Vendor</section>
					<section className='vendor-input'>{booking.vendor}</section>
				</div>

				<div className='vendor-input-div'>
					<section className='label'>Vendor Commission</section>
					<section className='vendor-input'>
						{booking.vendor_commission}
					</section>
				</div>

				<div className='vendor-input-div'>
					<section className='label'>Vendor Fee</section>
					<section className='vendor-input'>{booking.vendor_fee}</section>
				</div>

				<div className='vendor-input-div'>
					<section className='label'>Discount</section>
					<section className='vendor-input'>{booking.discount}</section>
				</div>

				<div className='vendor-input-div'>
					<section className='label'>Tax Responsibility</section>
					<section className='vendor-input'>
						{booking.tax_responsibility ? 'Us' : 'Them'}
					</section>
				</div>

				<div className='vendor-input-div'>
					<section className='label'>Fees Finalized</section>
					<section className='vendor-input'>
						{booking.finalized ? 'Yes' : 'No'}
					</section>
				</div>
			</div>

			<div className='booking-amount'>
				<section className='label'>Net Payout</section>
				<section className='financial-input'>
					<h4>Net Payout Calc here💰</h4>
				</section>
			</div>
		</div>
	);
}

export default BookingSheet;
