const statsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STATS':
        return action.payload;
      case 'CLEAR_STATS':
        return [];
      default:
        return state;
    }
  };

  export default statsReducer;