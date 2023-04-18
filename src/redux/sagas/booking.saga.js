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

function* fetchComments(action) {
  const id = action.payload;
  try {
    const comments = yield axios.get(`/api/booking/comments/${id}`);
    yield put({ type: 'SET_COMMENTS', payload: comments.data});
  } catch (error) {
    console.log('error fetching comments');
  }
};

function* postComment(action) {
  try {
    yield axios.post('/api/booking/comments', action.payload);
    yield put({ type: 'FETCH_COMMENTS', payload: action.payload.booking_id })
  } catch (error) {
    console.log('error posting comment: ', error);
  }
};

function* deleteComment(action) {
  const id = action.payload.id;
  try {
    yield axios.delete(`/api/booking/comments/${id}`);
    yield put({ type: 'FETCH_COMMENTS', payload: action.payload.booking_id });
  } catch (error) {
    console.log('error with deleting comment: ', error);
  }
};

function* bookingSaga() {
  yield takeEvery('POST_BOOKING', postBooking);
  yield takeEvery('UPDATE_TENANT', updateTenant);
  yield takeEvery('FETCH_BOOKINGS', fetchBookings);
  yield takeEvery('FETCH_COMMENTS', fetchComments);
  yield takeEvery('POST_COMMENT', postComment);
  yield takeEvery('DELETE_COMMENT', deleteComment);
}

export default bookingSaga;