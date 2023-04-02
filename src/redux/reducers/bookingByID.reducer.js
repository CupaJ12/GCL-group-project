// reducer to hold the booking by ID

// I set up this reducer to hold the booking by ID recieved from the database, and also be able to edit the booking by ID. might not need the edit part, but i left it in there for now.

const bookingByID = (state = [], action) => {
	console.log('in bookingByID reducer', action);
	switch (action.type) {
		case 'SET_BOOKING_BY_ID':
			console.log('in SET_BOOKING_BY_ID', action.payload);
			return action.payload;
		case 'EDIT_TENANT_INFO':
			console.log('in EDIT_TENANT_INFO', action.payload);
			return action.payload;
		case 'EDIT_FINANCIAL_INFO':
			console.log('in EDIT_FINANCIAL_INFO', action.payload);
			return action.payload;
		default:
			return state;
	}
};

export default bookingByID;
