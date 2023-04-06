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

    const handleDetails = (id) => {
        history.push(`/bookingdetails/${id}`);
    };

    // const booleanCheck = () => {
    //     if (property_id)
    //     ? return "NO" 
    // }

    return (
        <div>

            <div>
                <button className="button">
                    Search
                </button>
            </div>
            <section>
                {bookings.map(booking => (
                    <div className="bookings" key={booking.id}>
                        <fieldset>
                            <h3> Property Number: <i><u> {booking.property_id} </u></i> </h3>
                            <h3> Is Booking Finalized?: <i><u> {booking.finalized} </u></i> </h3>
                            <h3> Customer First Name: <i><u> {booking.customer_first_name} </u></i> </h3>
                            <h3> Customer Last Name: <i><u> {booking.customer_last_name} </u></i> </h3>
                            <h3> Checkin Date: <i><u> {booking.check_in_date} </u></i> </h3>
                            <h3> Checkout Date: <i><u> {booking.check_out_date} </u></i> </h3>
                            <h3> Is Booking Finalized?: <i><u> {booking.finalized} </u></i> </h3>
                            {/* <h3> Customer Address: <i><u> {booking.customer_address} </u></i> </h3>
                            <h3> Customer Email: <i><u> {booking.customer_email} </u></i> </h3>
                            <h3> Vendor: <i><u> {booking.vendor} </u></i> </h3>
                            <h3> Tax Responsibility: <i><u> {booking.tax_responsible} </u></i> </h3>
                            <h3> Pet Fee: <i><u> {booking.pet_fee} </u></i> </h3>
                            <h3> Cost Per Night: <i><u> {booking.cost_per_night} </u></i> </h3>
                            <h3> Vendor Commission: <i><u> {booking.vendor_commission} </u></i> </h3>
                            <h3> Vendor Fee: <i><u> {booking.vendor_fee} </u></i> </h3>
                            <h3> Booking Discount: <i><u> {booking.discount} </u></i> </h3>
                            <h3> Lodging Tax: <i><u> {booking.lodging_tax} </u></i> </h3>
                            <h3> Is Booking Finalized?: <i><u> {booking.finalized} </u></i> </h3> */}
                            <br></br>
                            <button className="button" onClick={() => handleDetails(booking.id)}> View Details </button>
                        </fieldset>
                    </div>
                ))}
            </section>

            <div>
                <button className="button" onClick={() => homeButton()}> Back </button>
            </div>

        </div>
    )
}

export default BookingsFolder;