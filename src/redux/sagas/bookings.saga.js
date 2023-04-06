import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// booking Saga: will be fired on "FETCH_BOOKINGS" actions
function* fetchBookings() {
    try {
        const response = yield axios.get('/api/allbookings');
        yield put({
            type: 'SET_BOOKINGS',
            payload: response.data
        });
    } catch (error) {
        console.log('FETCHBOOKINGS GET request failed', error);
    }
};

function* fetchDetails(action) {
    try {
        const id = action.payload;
        const response = yield axios.get(`/api/allbookings/${id}`);
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        });
    } catch (error) {
        console.log('FETCHDETAILS GET request failed', error);
    }
};

function* bookingsSaga() {
    yield takeEvery('FETCH_BOOKINGS', fetchBookings);
    yield takeEvery('FETCH_BY_DETAILS', fetchDetails);
}

export default bookingsSaga;