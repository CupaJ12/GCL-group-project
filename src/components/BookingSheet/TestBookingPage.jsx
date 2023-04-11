import React from 'react';
import './BookingSheet.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function TestBookingSheet() {
	const dispatch = useDispatch();
	const history = useHistory();
	const bookingList = useSelector((store) => store.testBookingReducer);

	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKINGS' });
	}, []);

	return (
		<>
			{bookingList.length > 0 && (
				<div className='bookings'>
					<span>
						<h2>Bookings</h2>
					</span>

					<ul>
						{bookingList.map((booking, index) => (
							<div className='bookingList'>
								<li key={index}> {booking.id}</li>
								<li key={index}> {booking.customer_first_name}</li>
								<li key={index}> {booking.customer_last_name}</li>
								<li key={index}> {booking.customer_email}</li>
								<li key={index}> {booking.customer_phone}</li>
								<li key={index}> {booking.vendor}</li>
								<li key={index}> {booking.check_in_date}</li>
								<li key={index}> {booking.check_out_date}</li>
								<li key={index}> {booking.tax_responsible}</li>
								<li key={index}> {booking.pet_fee}</li>
								<li key={index}> {booking.cost_per_night}</li>
								<li key={index}> {booking.vendor_commission}</li>
								<li key={index}> {booking.vendor_fee}</li>
								<li key={index}> {booking.discount}</li>
								<li key={index}> {booking.lodging_tax}</li>
								<li key={index}> {booking.finalized}</li>
								<li key={index}> {booking.property_id}</li>
                                <button onClick={() => history.push(`/bookingsheet/${booking.id}`)}>button</button>
							</div>
                            
						))}
					</ul>
				</div>
			)}
		</>
	);
}

export default TestBookingSheet;
