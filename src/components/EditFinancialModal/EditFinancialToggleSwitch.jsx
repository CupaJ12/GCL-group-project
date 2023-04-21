import React from 'react';
import './EditFinancialToggleSwitch.css';

const TaxToggleSwitch = (props) => {

    console.log(props.taxResponsibility);

    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Tax Responsibility</label>
            </div>
            <input 
                disabled={props.finalized === true} 
                className="slider-input" 
                type="checkbox" 
                onClick={() => props.setTaxResponsibility()}
            />
            <section className="slider round"></section>
            <div className="responsibility-text">{props.taxResponsibility === false ? 'them' : 'us'}</div>
        </label>
    )
};

const FeesFinalizedToggleSwitch = (props) => {

    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Fees Finalized</label>
            </div>
            <input className="slider-input" type="checkbox" onClick={() => props.setFinalized()}/>

            <section className="slider round"></section>
            <div className="responsibility-text">{props.finalized === false ? 'yes' : 'no'}</div>
        </label>
    )
};


export { TaxToggleSwitch, FeesFinalizedToggleSwitch };