import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditTenantModal from "../EditModal/EditTenantModal";


function EditBooking() {
     const [show, setShow] = useState(false); 
     const booking = useSelector((store) => store.booking);

    return (
        <div>
            <h1>Edit Booking Page</h1>
            {/* when button click, state set to true and opens modal */}
            <button onClick={() => setShow(true)}>
                Open Modal
            </button>
            <EditTenantModal
                onClose={() => setShow(false)}
                show={show}
                booking={booking}
            />

        </div>
    )
}

export default EditBooking;