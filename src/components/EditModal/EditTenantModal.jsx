import React from "react";
import './EditModal.css';


function EditTenantModal(props) {

    if (!props.show) {
        return null
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                    <form>
                        <div>
                            <label htmlFor="first-name">
                                First Name:
                                <input 
                                    type="text"
                                    name="first-name"
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="last-name">
                                Last Name:
                                <input 
                                    type="text"
                                    name="last-name"
                                />
                            </label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose}>close modal</button>
                </div>
            </div>

        </div>
    )
}

export default EditTenantModal;