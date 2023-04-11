import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* bookingByIDSaga() {
	yield takeLatest('FETCH_BOOKING_BY_ID', fetchByID);
}

export default bookingByIDSaga;
