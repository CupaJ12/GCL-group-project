import axios from 'axios';
import { put, takeEvery} from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postNewProperty(action) {
  try {
      console.log('in post new property saga with: ', action.payload);
      yield axios.post(`api/property`, action.payload);
  } catch (error) {
    console.log('error posting property', error);
  }
};

function* propertySaga() {
  yield takeEvery('POST_NEW_PROPERTY', postNewProperty);
};

export default propertySaga;