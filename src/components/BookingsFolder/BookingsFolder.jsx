import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function BookingsFolder() {

    const bookings = useSelector((store) => store.bookingsReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    const [search, setSearch] = useState();

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
{/* Plan is to finish this GET bookings by search query as a group */}
{/* insert on div line when ready to start working on it onSubmit={handleSearch} */}
{/* insert on button line when ready to start working on it 'onChange={(event) => setSearch(event.target.value)} */}
            <div>
                <input className="tenant-input"></input>
                <button className="submit-btn">
                    Search
                </button>
            </div>
            <section>
                {bookings.map(booking => (
                    <div className="bookings" key={booking.id}>
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
                        <button className="submit-btn" onClick={() => handleDetails(booking.id)}> VIEW DETAILS </button>
                    </div>
                ))}
            </section>

            <div>
                <button className="submit-btn" onClick={() => homeButton()}> HOME </button>
            </div>

        </div>
    )
}

export default BookingsFolder;