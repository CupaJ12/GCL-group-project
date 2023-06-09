import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './ToggleSwitch.css';

const TaxToggleSwitch = ({ feesFinalized }) => {
    const dispatch = useDispatch();
    const [taxResponsible, setTaxResponsible] = useState(false);
    
    useEffect(() => {
        dispatch({
            type: 'SET_TAX_RESPONSIBILITY',
            payload: taxResponsible
        })
    }, [taxResponsible]);

    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Tax Responsibility</label>
            </div>
            <input 
                disabled={feesFinalized} 
                className="slider-input" 
                type="checkbox" 
                onClick={() => setTaxResponsible(!taxResponsible)}
            />
            <section className="slider round"></section>
            <div className="responsibility-text">{taxResponsible === false ? 'them' : 'us'}</div>
        </label>
    )
};

const FeesFinalizedToggleSwitch = ({ submitDisabled }) => {
    const dispatch = useDispatch();
    const [feesFinalized, setFeesFinalized] = useState(false);

    useEffect(() => {
            dispatch({
                type: 'SET_FEES_FINALIZED',
                payload: feesFinalized
            });
    }, [feesFinalized]);

    return (
        <label className="toggle">
            <div className="slider-div">
                <label className="tax-responsibility-text">Fees Finalized</label>
            </div>
            <input className="slider-input" type="checkbox" disabled={submitDisabled} onClick={() => setFeesFinalized(!feesFinalized)}/>
            <section className="slider round"></section>
            <div className="responsibility-text">{feesFinalized === false ? 'no' : 'yes'}</div>
        </label>
    )
};


export { TaxToggleSwitch, FeesFinalizedToggleSwitch };