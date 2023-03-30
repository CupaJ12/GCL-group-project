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

    const homeButton = () => {
        history.push('/')
    };

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
                        <br></br>
                    </div>
                ))}
            </section>
            
            <div>
                <button onClick={() => homeButton()}> Go Home </button>
            </div>

        </div>
    )
}

export default BookingsFolder;