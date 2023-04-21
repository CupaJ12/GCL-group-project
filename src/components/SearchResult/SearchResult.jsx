import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './SearchResult.css';

function SearchResult() {

    const bookings = useSelector((store) => store.bookingsReducer);
    const history = useHistory();
    const dispatch = useDispatch();
    const dateProper = { year: 'numeric', month: 'long', day: 'numeric' };

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_BOOKINGS'
    //     })
    // }, [])

    // const homeButton = () => {
    //     history.push('/')
    // };

    const handleDetails = (id) => {
        history.push(`/bookingsheet/${id}`);
    };

    return (
            <section>
                {bookings.length > 0 &&
                    <div className="search-bookings-div">
                        {
                            bookings.map(booking => (
                                <div className="search-booking-summary" key={booking.id}>
                                    <section className="search-booking-detail-primary">{booking.customer_first_name} {booking.customer_last_name}</section>
                                    <section className="search-booking-detail-primary">{booking.property_name}</section>
                                    <section className="search-booking-detail">{new Date(booking.check_in_date).toLocaleDateString('en-US', dateProper)} - {new Date(booking.check_out_date).toLocaleDateString('en-US', dateProper)}</section>
                                    <section className="search-booking-detail"><b>Fees Finalized:</b> {booking.finalized ? 'Yes' : 'No'}</section>
                                    <button className="search-booking-details-btn" onClick={() => handleDetails(booking.id)}>View Booking</button>
                                </div>
                            ))
                        }
                    </div>
                }
            </section>
    )
};

export default SearchResult;