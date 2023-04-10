const unapprovedUsersReducer = (state =[], action) => {
    switch (action.type) {
      case 'SET_UNAPPROVED_USERS':
        return action.payload;
      default:
        return state;
    }
  };

  export default unapprovedUsersReducer;