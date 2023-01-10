const lovesAllReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOVES_ALL':
        return action.payload;
      default:
        return state;
    }
  };

  export default lovesAllReducer;