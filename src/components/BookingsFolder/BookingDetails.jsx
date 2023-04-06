import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

function BookingDetails() {

    const bookings = useSelector((store) => store.bookingsReducer);
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_BY_DETAILS',
            payload: id
        })
    }, [])

    const backButton = () => {
        // history.push('/allbookings');
        // window.location.reload(true);
    }

    return (
        <div>
            <section key={bookings.id}>
                <div className="bookings">
                    <fieldset>
                        <h3> Property Number: <i><u> {bookings.property_id} </u></i> </h3>
                        <h3> Is Booking Finalized?: <i><u> {bookings.finalized} </u></i> </h3>
                        <h3> Customer First Name: <i><u> {bookings.customer_first_name} </u></i> </h3>
                        <h3> Customer Last Name: <i><u> {bookings.customer_last_name} </u></i> </h3>
                        <h3> Checkin Date: <i><u> {bookings.check_in_date} </u></i> </h3>
                        <h3> Checkout Date: <i><u> {bookings.check_out_date} </u></i> </h3>
                        <h3> Customer Address: <i><u> {bookings.customer_address} </u></i> </h3>
                        <h3> Customer Email: <i><u> {bookings.customer_email} </u></i> </h3>
                        <h3> Vendor: <i><u> {bookings.vendor} </u></i> </h3>
                        <h3> Tax Responsibility: <i><u> {bookings.tax_responsible} </u></i> </h3>
                        <h3> Pet Fee: <i><u> {bookings.pet_fee} </u></i> </h3>
                        <h3> Cost Per Night: <i><u> {bookings.cost_per_night} </u></i> </h3>
                        <h3> Vendor Commission: <i><u> {bookings.vendor_commission} </u></i> </h3>
                        <h3> Vendor Fee: <i><u> {bookings.vendor_fee} </u></i> </h3>
                        <h3> Booking Discount: <i><u> {bookings.discount} </u></i> </h3>
                        <h3> Lodging Tax: <i><u> {bookings.lodging_tax} </u></i> </h3>
                        <h3> Is Booking Finalized?: <i><u> {bookings.finalized} </u></i> </h3>
                    </fieldset>
                </div>
            </section>

            <div>
                <button className="button" onClick={() => backButton()}> Go back </button>
            </div>
        </div>
    )
}

export default BookingDetails;