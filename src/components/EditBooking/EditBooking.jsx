import React, { useState } from "react";
import EditTenantModal from "../EditModal/EditTenantModal";


function EditBooking() {

    const [show, setShow] = useState(false);

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
            />

        </div>
    )
}

export default EditBooking;