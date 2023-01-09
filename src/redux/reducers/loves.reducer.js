const lovesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOVES':
        return action.payload;
      default:
        return state;
    }
  };

  export default lovesReducer;