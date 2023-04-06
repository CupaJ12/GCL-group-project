
const bookingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKINGS':
            return action.payload;
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

export default bookingsReducer;