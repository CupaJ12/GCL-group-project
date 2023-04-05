const properties = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROPERTIES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default properties;