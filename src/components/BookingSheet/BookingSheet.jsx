//component for displaying a single booking.
import React from 'react';
import './BookingSheet.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditTenantModal from '../EditTenantModal/EditTenantModal';
import EditFinancialModal from '../EditFinancialModal/EditFinancialModal';
import MathComponent from '../MathComponent/MathComponent';

function BookingSheet() {
	// declare constants: reducers, etc:
	const dispatch = useDispatch();
	const history = useHistory();
	// below passes the id from the url to the useParams hook
	const { id } = useParams();
	// below is a date formatter for the check in and check out dates
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	// below is a state variable for the edit tenant modal
	const [showTenant, setShowTenant] = useState(false);
	// below is a state variable for the edit financial modal
	const [showFinancial, setShowFinancial] = useState(false);
	const [change, setChange] = useState(0);


	// booking is the booking object from the database retrieved from the reducer
	const booking = useSelector((store) => store.bookingByID);
	// below are state variables for the check in and check out dates
	const [check_in_date, set_check_in_date] = useState(new Date());
	const [check_out_date, set_check_out_date] = useState(new Date());

	// declare  useEffect:
	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKING_BY_ID', payload: id });
		dispatch({ type: 'GET_VENDORS' });
	}, []);

	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKING_BY_ID', payload: id });
		dispatch({ type: 'GET_VENDORS' });
	}, [change]);

	useEffect(() => {
		set_check_in_date(new Date(booking.check_in_date));
		set_check_out_date(new Date(booking.check_out_date));
	}, [booking]);
	// the above [booking] dependency array is necessary to update the check in and check out dates when the booking object is updated

	// conditional rendering: if no booking, return error message
	if (!booking) {
		return <h1>Error: Check Server/Database🤔</h1>;
	}

	return (
		<div className='booking-form-container'>
			<div className='property-select-container'>
				<div className='section-header'>Property</div>
				<h2>{booking.property_name}</h2>
			</div>
			<div className='section-header'>
				Tenant
				<button onClick={() => setShowTenant(true)}>edit</button>
			</div>
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

			<div className='section-header'>
				Financial
				<button onClick={() => setShowFinancial(true)}>Edit Financial</button>
			</div>
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
					$<MathComponent booking={booking} type='gross' />
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
						{booking.tax_responsible ? 'Us' : 'Them'}
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
					$<MathComponent booking={booking} type='net' />
				</section>
			</div>
			<EditTenantModal
				onClose={() => setShowTenant(false)}
				setChange={() => setChange(change + 1)}
				show={showTenant}
				booking={booking}
			/>
			<EditFinancialModal
				onClose={() => setShowFinancial(false)}
				show={showFinancial}
				booking={booking}
			/>
		</div>
	);
}

export default BookingSheet;
