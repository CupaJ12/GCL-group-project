import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
};

function* fetchUnapprovedUsers() {
  try {
    const unapprovedUsers = yield axios.get('/api/user/unapproved');
    yield put({ type: 'SET_UNAPPROVED_USERS', payload: unapprovedUsers.data});
  } catch (error) {
    console.log('error with getting unapproved users');
  }
};

function* fetchApprovedUsers() {
  try {
    const approvedUsers = yield axios.get('/api/user/approved');
    yield put({ type: 'SET_APPROVED_USERS', payload: approvedUsers.data});
  } catch (error) {
    console.log('error with getting approved users');
  }
};

function* setUserApproved(action) {
  const id = action.payload;
  try {
    yield axios.put(`/api/user/${id}`);
    yield put({ type: 'FETCH_UNAPPROVED_USERS'});
  } catch (error) {
    console.log('error posting booking', error);
  }
};

function* deleteUser(action) {
  const id = action.payload;
  try {
    yield axios.delete(`/api/user/${id}`);
    yield put({ type: 'FETCH_UNAPPROVED_USERS' });
  } catch (error) {
    console.log('error with deleting user: ', error);
  }
};

function* setUserAdminStatus(action) {
  const id = action.payload.userId;
  try {
    yield axios.put(`/api/user/admin/${id}`, action.payload);
    yield put({ type: 'FETCH_APPROVED_USERS' });
  } catch (error) {
    console.log('error with setting user admin status');
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('FETCH_UNAPPROVED_USERS', fetchUnapprovedUsers);
  yield takeEvery('SET_USER_APPROVED', setUserApproved);
  yield takeEvery('DELETE_USER', deleteUser);
  yield takeEvery('FETCH_APPROVED_USERS', fetchApprovedUsers);
  yield takeEvery('SET_USER_ADMIN_STATUS', setUserAdminStatus);
}

export default userSaga;
