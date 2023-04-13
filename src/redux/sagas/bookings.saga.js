import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

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

function* deleteBookingId(action) {
    try {
        const id = action.payload;
        yield axios.delete(`/api/allbookings/${id}`);
        yield put({ type: 'FETCH_BOOKINGS' });
    } catch (error) {
        console.log(' request failed', error);
    }
};

function* fetchByID(action) {
	try {
		const response = yield axios.get(`/api/booking/${action.payload}`);
		console.log('get by date:', response.data);
		yield put({ type: 'SET_BOOKING_BY_ID', payload: response.data });
		console.log("we hit the set_booking_by_id yield in the saga")
	} catch (error) {
		console.log('Error with fetch exercise log:', error);
	}
}

// recieves action.payload from EditTenantModal and call PUT request
function* updateTenant(action) {
    const id = action.payload.id
    try {
        console.log('updateTenant saga hit', action.payload);
        axios.put(`/api/booking/tenant/${id}`, action.payload);
    } catch (err) {
        console.log('error with updateTenant saga');
    }
}

function* updateFinancial(action) {
    try {
        console.log('updateFinancial saga hit', action.payload);
    } catch (err) {
        console.log('error with updateFinancial saga');
    }
}

function* bookingsSaga() {
    yield takeEvery('FETCH_BOOKINGS', fetchBookings);
    yield takeEvery('FETCH_BY_DETAILS', fetchDetails);
    yield takeEvery('DELETE_BOOKING_BY_ID', deleteBookingId);
    yield takeLatest('FETCH_BOOKING_BY_ID', fetchByID);
    yield takeEvery('EDIT_TENANT_INFO', updateTenant);
    yield takeEvery('EDIT_FINANCIAL_INFO', updateFinancial);
}

export default bookingsSaga;