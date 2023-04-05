import axios from 'axios';
import { put, takeEvery} from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* getVendors() {
  try {
      const vendors = yield axios.get(`api/vendor`);
      yield put({ type: 'SET_VENDORS', payload: vendors.data});
      console.log('in vendor saga with db data: ', vendors.data)
  } catch (error) {
    console.log('error getting vendors', error);
  }
};

function* vendorSaga() {
  yield takeEvery('GET_VENDORS', getVendors);
};

export default vendorSaga;