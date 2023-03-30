import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
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
}

function* bookingsSaga() {
    yield takeEvery('FETCH_BOOKINGS', fetchBookings);
}

export default bookingsSaga;