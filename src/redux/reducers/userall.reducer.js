const userAllReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_ALL':
        return action.payload;
      default:
        return state;
    }
  };

  export default userAllReducer;