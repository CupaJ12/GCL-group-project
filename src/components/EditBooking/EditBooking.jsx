import React, { useState } from "react";
import EditModal from "../EditModal/EditModal";


function EditBooking() {

    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>Edit Booking Page</h1>
            <button onClick={() => setShow(true)}>
                Open Modal
            </button>
            <EditModal onClose={() => setShow(false)} show={show}/>

        </div>
    )
}

export default EditBooking;