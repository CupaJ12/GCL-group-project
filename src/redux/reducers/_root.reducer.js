import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import bookingsReducer from './bookings.reducer';
import bookingByID from './bookingByID.reducer';
import booking from './booking.reducer';
import { taxResponsibility, feesFinalized } from './toggle.reducer';
import vendorList from './vendor.reducer';
import propertyList from './property.reducer';

import testBookingReducer from './getBookingsTest.reducer';

import deleteBookingReducer from './delete.id.router';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  bookingsReducer,
  booking,
  bookingByID, //will have a single booking selected by ID
  booking, // tester for khue
  taxResponsibility, // contains boolean value for tax responsibility
  feesFinalized, //contains finalized fees boolean value
  vendorList, //contains an array of vendor names
  propertyList, //contains an array of properties

  testBookingReducer,

  deleteBookingReducer,

});

export default rootReducer;