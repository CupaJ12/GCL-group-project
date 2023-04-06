
const deleteBookingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_BOOKING':
            return action.payload;
        default:
            return state;
    }
};

export default deleteBookingReducer;