import React, { useState } from 'react';
import './EditFinancialToggleSwitch.css';

const TaxToggleSwitch = (props) => {
    // console.log(props.taxResponsibility);

    const [toggleChecked, setToggleChecked] = useState(props.taxResponsibility);

    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Tax Responsibility</label>
            </div>
            <input
                disabled={props.finalized === true}
                className="slider-input"
                type="checkbox"
                checked={toggleChecked}
                onClick={() => props.setTaxResponsibility()}
                onChange={() => setToggleChecked(!toggleChecked)}
            />
            <section className="slider round"></section>
            <div className="responsibility-text">{props.taxResponsibility === false ? 'them' : 'us'}</div>
        </label>
    )
};

const FeesFinalizedToggleSwitch = (props) => {
    
    const [toggleChecked, setToggleChecked] = useState(props.finalized);

    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Fees Finalized</label>
            </div>
            <input 
                className="slider-input" 
                type="checkbox" 
                checked={toggleChecked} 
                onClick={() => props.setFinalized()} 
                onChange={() => setToggleChecked(!toggleChecked)}
            />
            <section className="slider round"></section>
            <div className="responsibility-text">{props.finalized === false ? 'no' : 'yes'}</div>
        </label>
    )
};


export { TaxToggleSwitch, FeesFinalizedToggleSwitch };