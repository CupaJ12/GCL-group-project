import React from "react";
import './EditModal.css';


function EditModal(props) {

    if(!props.show) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-body">
                    modal body
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose}>close modal</button>
                </div>
            </div>
            
        </div>
    )
}

export default EditModal;