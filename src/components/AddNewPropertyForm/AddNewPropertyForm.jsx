import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CancelValidation from '../CancelValidationModal/CancelValidationModal';
import './AddProperty.css';

const AddNewPropertyForm = ({modalVisible, onClose}) => {
    const [address, setAddress] = useState('');
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [change, setChange] = useState(0);
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const [propertyName, setPropertyName] = useState('');
    const [state, setState] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [zipCode, setZipCode] = useState('');

    useEffect(() => {
        checkFormComplete();
    }, [change]);

    useEffect(() => {
        setCancelModalVisible(false);
        setAddress('');
        setCity('');
        setPropertyName('');
        setState('');
        setZipCode('');
    }, [modalVisible]);

    const checkFormComplete = () => {
        setSubmitDisabled(
            propertyName.length == 0 
            || address.length == 0
            || city.length == 0
            || state.length < 2   
            || zipCode.length < 5 
        );
    };

    const onSubmit = (event) => {
        event.preventDefault();
        let propertyAddress = {
            address,
            city,
            state,
            zipCode
        };
        let newProperty = {
            propertyName,
            propertyAddress
        };

        dispatch({
            type: 'POST_NEW_PROPERTY',
            payload: newProperty
        });
        setAddress('');
        setCity('');
        setState('');
        setZipCode('');
        onClose();
    };

    return ReactDOM.createPortal(
        <CSSTransition
            in={modalVisible}
            unmountOnExit
            timeout={{ enter: 300, exit: 300 }}
        >
            <div className="modal">
                <div className="property-form-container">
                    
                    <form key="add-property-form" onSubmit={onSubmit}>

                        <div className="section-header">
                            Add Property
                        </div>

                        <div className="property-name-container">
                            <div className="property-input-div">
                                <label className="label" htmlFor="property-name">Property Name *</label>
                                <br />
                                <input
                                    id="property-name"
                                    name="property-name"
                                    type="text"
                                    value={propertyName}
                                    placeholder="property name"
                                    required
                                    className="tenant-input"
                                    onChange={(event) => {setPropertyName(event.target.value); checkFormComplete(); setChange(change + 1)}}
                                />
                            </div>

                            <div className="property-input-div">
                                <label className="label" htmlFor="address">Address *</label>
                                <br />
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={address}
                                    placeholder="address"
                                    required
                                    className="tenant-input"
                                    onChange={(event) => {setAddress(event.target.value); checkFormComplete(); setChange(change + 1)}}
                                />
                            </div>

                            <div className="property-input-div">
                                <label className="label" htmlFor="city">City *</label>
                                <br />
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={city}
                                    placeholder="city"
                                    required
                                    className="tenant-input"
                                    onChange={(event) => {setCity(event.target.value); checkFormComplete(); setChange(change + 1)}}
                                />
                            </div>

                            <div className="property-input-div">
                                <label className="label" htmlFor="state">State *</label>
                                <br />
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={state}
                                    placeholder="state"
                                    required
                                    className="tenant-input"
                                    onChange={(event) => {setState(event.target.value); checkFormComplete(); setChange(change + 1)}}
                                />
                            </div>

                            <div className="property-input-div">
                                <label className="label" htmlFor="zip-code">Zip Code *</label>
                                <br />
                                <input
                                    id="zip-code"
                                    name="zip-code"
                                    type="text"
                                    value={zipCode}
                                    placeholder="zip code"
                                    required
                                    className="tenant-input"
                                    onChange={(event) => {setZipCode(event.target.value); checkFormComplete(); setChange(change + 1)}}
                                />
                            </div>
                        </div>

                        <div className="nav-btn-div">
                            <button 
                                type="submit"
                                className="submit-btn"
                                disabled={submitDisabled}
                            >
                                SUBMIT
                            </button>

                            <button 
                                type="button"
                                className="cancel-add-property-btn"
                                onClick={() => setCancelModalVisible(true)}
                            >
                                CANCEL
                            </button>
                            <CancelValidation show={cancelModalVisible} onConfirm={onClose} onDeny={() => setCancelModalVisible(false)}/>
                        </div>

                    </form>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('react-root')
    );
};

export default AddNewPropertyForm;