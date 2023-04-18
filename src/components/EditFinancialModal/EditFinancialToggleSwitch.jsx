import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './EditFinancialToggleSwitch.css';

const TaxToggleSwitch = (props) => {
    // const dispatch = useDispatch();
    // const [taxResponsible, setTaxResponsible] = useState(false);
    
    // useEffect(() => {
    //     dispatch({
    //         type: 'SET_TAX_RESPONSIBILITY',
    //         payload: taxResponsible
    //     })
    // }, [taxResponsible]);

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

    // useEffect(() => {
    //         dispatch({
    //             type: 'SET_FEES_FINALIZED',
    //             payload: feesFinalized
    //         });
    // }, [feesFinalized]);

    console.log(props.finalized);


    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Fees Finalized</label>
            </div>
            {/* <input className="slider-input" type="checkbox" disabled={submitDisabled} onClick={() => props.setFinalized()}/> */}
            <input className="slider-input" type="checkbox" onClick={() => props.setFinalized()}/>

            <section className="slider round"></section>
            <div className="responsibility-text">{props.finalized === false ? 'no' : 'yes'}</div>
        </label>
    )
};


export { TaxToggleSwitch, FeesFinalizedToggleSwitch };