import axios from 'axios';
import { put, takeEvery} from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postBooking(action) {
    try {
      console.log('payload in POST_BOOKING: ', action.payload);
    // yield axios.post(`api/booking`, action.payload);
    
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* bookingSaga() {
  yield takeEvery('POST_BOOKING', postBooking);
}

export default userSaga;