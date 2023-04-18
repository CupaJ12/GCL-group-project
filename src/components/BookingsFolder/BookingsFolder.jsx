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
                                <div className="brookings" key={booking.id}>
                                    <h3> Property Number: <i><u> {booking.property_id} </u></i> </h3>
                                    <h3> Is Booking Finalized: <i><u> {booking.finalized ? 'YES' : 'NO'} </u></i> </h3>
                                    <h3> Customer First Name: <i><u> {booking.customer_first_name} </u></i> </h3>
                                    <h3> Customer Last Name: <i><u> {booking.customer_last_name} </u></i> </h3>
                                    <h3> Checkin Date: <i><u> {booking.check_in_date} </u></i> </h3>
                                    <h3> Checkout Date: <i><u> {booking.check_out_date} </u></i> </h3>
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