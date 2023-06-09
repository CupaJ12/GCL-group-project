import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './FindBooking.css';
import BookingsFolder from "../BookingsFolder/BookingsFolder";
import { useHistory } from "react-router-dom";
import SearchResult from "../SearchResult/SearchResult";


function FindBooking() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const history = useHistory();
    const [search, setSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [enteredInput, setEnteredInput] = useState('');
    const dispatch = useDispatch();

    const searchButton = () => {
        console.log('search Button clicked', inputValue);
        if (inputValue === '') {
            alert('please enter input');
        }
        else if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue) || /^\d{1}\/\d{1}\/\d{4}$/.test(inputValue) || /^\d{1}\/\d{2}\/\d{4}$/.test(inputValue) || /^\d{2}\/\d{1}\/\d{4}$/.test(inputValue)) {
            let date = new Date(inputValue).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
            console.log('new date in searchButton', date);
            dispatch({
                type: 'SEARCH',
                payload: encodeURIComponent(date)
            })
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
            dispatch({
                type: 'SEARCH',
                payload: inputValue
            })
        }
        setSearch(true);
        setInputValue('');
        setEnteredInput(inputValue);
    }

    const enterKeyPressed = (e) => {
        console.log('inside enterKeyPressed', e);
        if (e.key === 'Enter') {
            searchButton();
        }
    }

    return (
        <div className="find-booking-container">
            <button
                className="back-btn"
                onClick={() => history.push('/')}
            >
                HOME
            </button>
            <br />
            <input
                className="searchbar"
                placeholder="search first name, last name, property, or check-in date (mm/dd/yyyy)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => enterKeyPressed(e)}
            />
            <br></br>
            <button className="search-btn" onClick={() => searchButton()}>SEARCH</button>
            {search &&
                <div>
                    <div className="section-header">Search Result for: {enteredInput}</div>
                    < SearchResult inputValue={inputValue} />
                </div>
            }
            {!search &&
                <div>
                    <div className="section-header">Recently Entered Bookings</div>
                    <BookingsFolder />
                </div>
            }
        </div>
    )
}

export default FindBooking;