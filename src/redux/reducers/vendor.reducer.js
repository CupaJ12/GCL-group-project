const vendors = (state = [], action) => {
    switch (action.type) {
      case 'SET_VENDORS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default vendors;