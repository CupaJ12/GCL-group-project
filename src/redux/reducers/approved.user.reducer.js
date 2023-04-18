const approvedUsersReducer = (state =[], action) => {
    switch (action.type) {
      case 'SET_APPROVED_USERS':
        return action.payload;
      default:
        return state;
    }
  };

  export default approvedUsersReducer;