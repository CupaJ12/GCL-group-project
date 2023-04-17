import axios from 'axios';
import { put, takeEvery} from 'redux-saga/effects';

function* getVendors() {
  try {
      const vendors = yield axios.get(`/api/vendor`);
      yield put({ type: 'SET_VENDORS', payload: vendors.data});
      console.log('in vendor saga with db data: ', vendors.data);
  } catch (error) {
    console.log('error getting vendors', error);
  }
};

function* postNewVendor(action) {
    console.log('in vendor post saga with: ', action.payload);
    try {
        yield axios.post(`/api/vendor`, action.payload);
        yield put({ type: 'GET_VENDORS' });
        console.log('in vendor saga with db data: ', vendors.data)
    } catch (error) {
      console.log('error getting vendors', error);
    }
  };


function* vendorSaga() {
  yield takeEvery('GET_VENDORS', getVendors);
  yield takeEvery('POST_NEW_VENDOR', postNewVendor);
};

export default vendorSaga;