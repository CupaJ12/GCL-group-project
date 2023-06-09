import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import bookingsReducer from './bookings.reducer';
import bookingByID from './bookingByID.reducer';
import { taxResponsibility, feesFinalized } from './toggle.reducer';
import vendorList from './vendor.reducer';
import propertyList from './property.reducer';
import unapprovedUsers from './unapproved.user.reducer';
import approvedUsers from './approved.user.reducer';
import comments from './comments.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  bookingsReducer, //booking reducer that will have top 10 recent bookings
  bookingByID, //will have a single booking selected by ID
  taxResponsibility, // contains boolean value for tax responsibility
  feesFinalized, //contains finalized fees boolean value
  vendorList, //contains an array of vendor names
  propertyList, //contains an array of properties
  unapprovedUsers, //contains all users that are currently unapproved
  approvedUsers, //contains all users that are currently approved
  comments, //contains all comments at specified booking id
});

export default rootReducer;