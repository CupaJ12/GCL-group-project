const bookingReducer = (state = [{firstName: 'Khue', lastName: 'Lee'}], action) => {
    switch (action.type) {
        case 'SET_BOOKING':
            return action.payload;
         default:
            return state;
    }
};

export default bookingReducer;