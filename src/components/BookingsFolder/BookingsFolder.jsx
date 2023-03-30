import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function BookingsFolder() {

    const bookings = useSelector((store) => store.bookingsReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_BOOKINGS'
        })
    }, [])

    return (
        <div>
            <section>
                {bookings.map(booking => (
                    <div className="" key={booking.id}>
                        <h3> {booking} </h3>
                        <h3> {booking} </h3>
                        <h3> {booking} </h3>
                        <h3> {booking} </h3>
                        <h3> {booking} </h3>
                    </div>
                ))}
            </section>

        </div>
    )
}

export default BookingsFolder;