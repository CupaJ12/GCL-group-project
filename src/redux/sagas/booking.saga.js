import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// receives action.payload form saveTenant in EditTenantModal and send it to booking router
function* updateTenant(action) {
    try {
        console.log(action.payload);

    } catch (err) {
        console.log('error with updateTenant saga');
    }
}


// worker Saga: will be fired on "FETCH_USER" actions
function* postBooking(action) {
  console.log('in post booking saga with: ', action.payload);
  try {
      yield axios.post('/api/booking', action.payload);
  } catch (error) {
    console.log('error posting booking', error);
  }
}

function* fetchBookings() {
  console.log('in fetchBooking saga')
    try {
        const response = yield axios.get('/api/booking');
        console.log('in fetchBooking saga with: ', response.data);
        yield put({ type: 'SET_BOOKINGS_TEST', payload: response.data });
    } catch (error) {
        console.log('error fetching booking', error);
    }
}


function* bookingSaga() {
  yield takeEvery('POST_BOOKING', postBooking);
  yield takeEvery('UPDATE_TENANT', updateTenant);
  yield takeEvery('FETCH_BOOKINGS', fetchBookings);
}

export default bookingSaga;