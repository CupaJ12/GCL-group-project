//component for displaying a single booking.

// TODO:
// 1. make a GET request to the server to get the booking data (WIP)
// 1A. make a saga to get the booking data
// 1B. make a reducer to store the booking data (✅)

// 2. display the booking data on the DOM
// 3. make a DELETE request to the server to delete the booking
// 4. make a PUT request to the server to edit the booking
// 5. make a GET request to the server to get the comments for the booking
// 6. make a POST request to the server to add a comment to the booking
// 7. make a DELETE request to the server to delete a comment from the booking
// 8. make a PUT request to the server to edit a comment from the booking

import React from 'react';
import './LogHistoryPage.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function BookingSheet() {
	// declare constants: reducers, etc:
	const dispatch = useDispatch();
	const history = useHistory();
	// booking is an unmade reducer
	const booking = useSelector((store) => store.booking);

	// declare functions: dispatch, history, useEffect etc:
	useEffect(() => {
		dispatch({ type: 'FETCH_BOOKING_BY_ID' });
	}, []);

	// declare variables: useState, etc:

	// handle functions: onClick, etc:
	const handleBack = () => {
		console.log('clicked back');
		// history.push('/ANYWHERE');
	};

	const handleDelete = () => {
		console.log('clicked delete');
		// dispatch({ type: 'DELETE_BOOKING', payload: booking.id });
		// history.push('/ANYWHERE');
	};

	const handleTenantEdit = () => {
		console.log('clicked tenant edit');
	};

	const handleFinancialEdit = () => {
		console.log('clicked financial edit');
	};

	// !Comment handlers!
	const handleCommentEdit = () => {
		console.log('clicked comment edit');
	};

	const handleCommentDelete = () => {
		console.log('clicked comment delete');
	};

	// conditional rendering: if no booking, return loading

	if (!booking) {
		return <h1>loading...🤔</h1>;
	}

	return (
		<div>
			<h1> WIP</h1>
			<h2>🤠</h2>
		</div>
	);
}

export default BookingSheet;
