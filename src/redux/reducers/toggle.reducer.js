const taxResponsibility = (state = '', action) => {
    switch (action.type) {
      case 'SET_TAX_RESPONSIBILITY':
        return action.payload;
      default:
        return state;
    }
  };

  const feesFinalized = (state = '', action) => {
    switch (action.type) {
      case 'SET_FEES_FINALIZED':
        return action.payload;
      default:
        return state;
    }
  };
  
  
  
  export {taxResponsibility, feesFinalized};
  