import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import bookingsSaga from './bookings.saga';
import bookingSaga from './booking.saga';
import propertySaga from './property.saga';
import vendorSaga from './vendor.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    bookingsSaga(),
		// bookingByIDSaga(),
    bookingSaga(),
    propertySaga(),
    vendorSaga(),
	]);
};
