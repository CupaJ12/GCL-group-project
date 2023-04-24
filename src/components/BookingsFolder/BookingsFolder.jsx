import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './BookingsFolder.css';

function BookingsFolder() {

    const bookings = useSelector((store) => store.bookingsReducer);
    const history = useHistory();
    const dispatch = useDispatch();
    const dateProper = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        dispatch({
            type: 'FETCH_BOOKINGS'
        })
    }, [])

    const homeButton = () => {
        history.push('/')
    };

    const handleDetails = (id) => {
        history.push(`/bookingsheet/${id}`);
    };
    // For bookings by search query
    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     dispatch({
    //         type: 'MUST_NAME_STILL',
    //         payload: search
    //     })
    // };

    return (
        <section>
            {bookings.length > 0 &&
                <div className="bookings-div">
                    {
                        bookings.map(booking => (
                            <div className="booking-summary" key={booking.id}>
                                <section className="booking-detail-primary">{booking.customer_first_name} {booking.customer_last_name}</section>
                                <section className="booking-detail-primary">{booking.property_name}</section>
                                <section className="booking-detail">{new Date(booking.check_in_date).toLocaleDateString('en-US', dateProper)} -
                                    <br/>
                                    {new Date(booking.check_out_date).toLocaleDateString('en-US', dateProper)}</section>
                                <section className="booking-detail"><b>Fees Finalized:</b> {booking.finalized ? 'Yes' : 'No'}</section>
                                <button className="booking-details-btn" onClick={() => handleDetails(booking.id)}>View Booking</button>
                            </div>
                        ))
                    }
                </div>
            }
        </section>
    )
};

export default BookingsFolder;