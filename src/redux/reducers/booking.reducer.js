const bookingReducer = (state = [{firstName: 'Khue', lastName: 'Lee', email: 'khuelee55@gmail.com', phone: '' }], action) => {
    switch (action.type) {
        case 'SET_BOOKING':
            return action.payload;
         default:
            return state;
    }
};

export default bookingReducer;