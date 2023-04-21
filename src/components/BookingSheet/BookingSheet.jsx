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
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const [emptyComment, setEmptyComment] = useState(false);
	const history = useHistory();
	const { id } = useParams();
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const [showTenant, setShowTenant] = useState(false);
	const [showFinancial, setShowFinancial] = useState(false);
	const [change, setChange] = useState(0);
	const booking = useSelector((store) => store.bookingByID);
	const [check_in_date, set_check_in_date] = useState(new Date());
	const [check_out_date, set_check_out_date] = useState(new Date());
	const comments = useSelector((store) => store.comments);
	const user = useSelector((store) => store.user);


	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKING_BY_ID', payload: id });
		dispatch({ type: 'GET_VENDORS' });
		dispatch({ type: 'FETCH_COMMENTS', payload: Number(id)});
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKING_BY_ID', payload: id });
		dispatch({ type: 'GET_VENDORS', payload: Number(id) });
	}, [change]);

	useEffect(() => {
		set_check_in_date(new Date(booking.check_in_date));
		set_check_out_date(new Date(booking.check_out_date));
	}, [booking]);

	const handleSubmit = () => {
		if (comment.length === 0) {
			setEmptyComment(true);
			return
		} else
		if (comment.length > 0) {
			setEmptyComment(false);
			dispatch({ 
				type: 'POST_COMMENT', 
				payload: {
					comment, 
					booking_id: id, 
					user_id: user.id
				}
			});
		}
		setComment('');
	};

	const handleDelete = (commentId) => {
		dispatch({ 
			type: 'DELETE_COMMENT', 
			payload: {
				id: commentId, 
				booking_id: id
			} 
		});
	}

	// conditional rendering: if no booking, return error message
	if (!booking) {
		return <h1>Error: Check Server/Database🤔</h1>;
	}

	return (
		<div className="booking-form-container">
			<div className="nav-btns">
				<button className="back-btn" onClick={() => history.push('/findBooking')}>BACK</button>
				<button className="back-btn" onClick={() => history.push('/')}>HOME</button>
			</div>
			<div className="property-select-container">
				<div className="section-header">Property</div>
				<section className="property-header">{booking.property_name}</section>
			</div>

			<div className="booking-sheet-section-header">
				Tenant
				<button className="booking-sheet-edit-btn" onClick={() => setShowTenant(true)}>edit</button>
			</div>

			<div className="booking-sheet-container">
				<div className="booking-sheet-tenant-div">
					<b>{booking.customer_first_name} {booking.customer_last_name}</b>
					<br />
					{booking.customer_phone}
					<br />
					{/* {booking.customer_phone.length > 0 && <br />} */}
					{booking.customer_email}
					<br />
					{/* {booking.customer_email.length > 0 && <br />} */}
					<div className="booking-sheet-dates">
						<b>check in:</b> {check_in_date.toLocaleDateString('en-US', options)}
						<br />
						<b>check out:</b> {check_out_date.toLocaleDateString('en-US', options)}
					</div>
				</div>
			</div>

			<div className="booking-sheet-section-header">
				Financial
				<button className="booking-sheet-edit-btn" onClick={() => setShowFinancial(true)}>edit</button>
			</div>

			<div className="booking-sheet-container">
				<div className="booking-sheet-financial-div">
					<section className="booking-sheet-financial-label">Length Of Stay:</section>
					<section className="booking-sheet-financial"><MathComponent booking={booking} type='lengthOfStay' /> nights</section>
					<br />
					<section className="booking-sheet-financial-label">Rate:</section>
					<section className="booking-sheet-financial">{booking.cost_per_night}/night</section>
					<br />
					<section className="booking-sheet-financial-label">Pet Fee:</section>
					<section className="booking-sheet-financial">{booking.pet_fee}</section>
					<br />
					<section className="booking-sheet-financial-label">Cleaning Fee:</section>
					<section className="booking-sheet-financial">{booking.cleaning_fee}</section>
					<br />
					<section className="booking-sheet-financial-label">Lodging Tax:</section>
					<section className="booking-sheet-financial">{booking.lodging_tax}</section>
				</div>
			</div>

			<div className="booking-amount">
				<h2 className="financial-headers">Gross Booking Amount</h2>
				<div className="money-total">
					$<MathComponent booking={booking} type='gross' /> {/* potential rounding descrepancies when youre trying to round a number thats exactly half way between two numbers git ad */}
				</div>
			</div>

			<hr className="divider"/>

			<div className="booking-sheet-container">
				<div className="booking-sheet-financial-div">
					<section className="booking-sheet-financial-label">Vendor:</section>
					<section className="booking-sheet-financial">{booking.vendor}</section>
					<br />
					<section className="booking-sheet-financial-label">Vendor Commission:</section>
					<section className="booking-sheet-financial">{booking.vendor_commission}</section>
					<br />
					<section className="booking-sheet-financial-label">Vendor Fee:</section>
					<section className="booking-sheet-financial">{booking.vendor_fee}</section>
					<br />
					<section className="booking-sheet-financial-label">Discount:</section>
					<section className="booking-sheet-financial">{booking.discount}</section>
				</div>
			</div>

			<div className="booking-amount">
				<h2 className="financial-headers">Net Payout</h2>
				<div className="money-total">
					$<MathComponent booking={booking} type='net' /> {/* potential rounding descrepancies when youre trying to round a number thats exactly half way between two numbers git ad */}
				</div>
			</div>		

			<hr className="divider"/>

			<div className="booking-sheet-container">
				<div className="booking-sheet-financial-div">
					<section className="booking-sheet-financial-label">Tax Responsibility:</section>
					<section className="booking-sheet-financial">{booking.tax_responsible ? 'Us' : 'Them'}</section>
					<br />
					<section className="booking-sheet-financial-label">Fees Finalized:</section>
					<section className="booking-sheet-financial">{booking.finalized ? 'Yes' : 'No'}</section>
				</div>
			</div>

			<div className="booking-sheet-section-header">
				Comments
			</div>
			{comments.length > 0 &&
				<div className="comments-div">
					{comments.map((comment, index) => {
						return (
							<div key={`${comment.id}-${index}`} className="comment">
								<b>{comment.username}:</b> "{comment.comment}"
								{user.admin && <button onClick={() => handleDelete(comment.id)} className="delete-comment-btn">X</button>}
							</div>
						)
					})}
					<br />
					<br />
					<hr className="divider"/>
				</div>
			}
			<div className="comment-input-div">
				<label className="label" htmlFor="comment">Add A Comment</label>
			</div>          
			<input
				id="comment"
				name="comment"
				type="text"
				value={comment}
				placeholder="new comment"
				className="tenant-input"
				onChange={(event) => {setComment(event.target.value)}}
			/>
			{emptyComment && <section className="empty-comment-warning">comment cannot be blank!</section>}
			<br />
			<button className="comment-submit-btn" onClick={handleSubmit}>Submit</button>

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
			{/* home button */}
			<button onClick={() => history.push('/')} className="nav-med-btn">Home</button>
		</div>
		
	)
	
};



export default BookingSheet;
