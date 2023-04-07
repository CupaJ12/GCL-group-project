const testBookingReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKINGS_TEST':
            return action.payload;
         default:
            return state;
    }
};

export default testBookingReducer;