import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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
        <div className="booking-form-container">

            <h1 className="title" >
                <u> 10 most recent bookings by date: </u>
            </h1>

            <section>
                {bookings.length > 0 &&
                    <>
                        {
                            bookings.map(booking => (
                                <div className="bookings" key={booking.id}>
                                    <h4> Property Name: <i><u> {booking.property_name} </u></i> </h4>
                                    <h4> Is Booking Finalized: <i><u> {booking.finalized ? 'YES' : 'NO'} </u></i> </h4>
                                    <h4> Customer Name: <i><u> {booking.customer_first_name} {booking.customer_last_name} </u></i> </h4>
                                    <h4> Checkin Date: </h4> <h3> <i><u> {new Date(booking.check_in_date).toLocaleDateString('en-US', dateProper)} </u></i> </h3>
                                    <h4> Checkout Date: </h4> <h3> <i><u> {new Date(booking.check_out_date).toLocaleDateString('en-US', dateProper)} </u></i> </h3>
                                    <br></br>
                                    <button className="submit-btn" onClick={() => handleDetails(booking.id)}> VIEW DETAILS </button>
                                </div>
                            ))
                        }
                    </>
                }
            </section>



        </div>
    )
}

export default BookingsFolder;