import axios from 'axios';
import { put, takeEvery} from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postBooking(action) {
  try {
      yield axios.post(`api/booking`, action.payload);
  } catch (error) {
    console.log('error posting booking', error);
  }
}

function* bookingSaga() {
  yield takeEvery('POST_BOOKING', postBooking);
}

export default bookingSaga;