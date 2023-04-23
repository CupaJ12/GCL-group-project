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
    const dispatch = useDispatch();

    const searchButton = () => {
        console.log('search Button clicked', inputValue);
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
            dispatch({
                type: 'SEARCH',
                payload: encodeURIComponent(inputValue)
            })    
        } else {
            dispatch({
                type: 'SEARCH',
                payload: inputValue
            })
        }
        setSearch(true);  
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
                />
            <br></br>
            <button className="search-btn" onClick={() => searchButton()}>SEARCH</button>
            {search &&
                <div>
                    < SearchResult/>
                </div>
            }
            {!search &&
                <div className="bookings-folder">
                    <div className="section-header">Recently Entered Bookings</div>
                    <BookingsFolder />
                </div>
            }
        </div>
    )
}

export default FindBooking;