//this component

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
		return <h1>loading...</h1>;
	}

	return (
		<div>
			<h1> WIP</h1>
			<h2>🤠</h2>
		</div>
	);
}

export default BookingSheet;
