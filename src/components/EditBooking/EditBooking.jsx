import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditTenantModal from "../EditTenantModal/EditTenantModal";
import EditFinancialModal from "../EditFinancialModal/EditFinancialModal";

function EditBooking() {
     const [showTenant, setShowTenant] = useState(false); 
     const [showFinancial, setShowFinancial] = useState(false);
     const booking = useSelector((store) => store.booking);

    return (
        <div>
            <h1>Edit Booking Page</h1>
            {/* when button click, state set to true and opens modal */}
            <button onClick={() => setShowTenant(true)}>
                Edit Tenant
            </button>
            <br/>
            <button onClick={() => setShowFinancial(true)}>
                Edit Financial
            </button>
            <EditTenantModal
                onClose={() => setShowTenant(false)}
                show={showTenant}
                booking={booking}
            />
            <EditFinancialModal
                onClose={() => setShowFinancial(false)}
                show={showFinancial}
                booking={booking}
            />
        </div>
    )
}

export default EditBooking;