import React, { useState } from "react";
import ModalChild from "./ModalChild";

function ModalParent() {
     const [show, setShow] = useState(false);

    return (
        <div>
            <h1>Modal Parent</h1>
            {/* when button click, state set to true and opens modal */}
            <button onClick={() => setShow(true)}>
                Open Modal
            </button>
            <ModalChild
                onClose={() => setShow(false)}
                show={show}
            />
        </div>
    )
};

export default ModalParent;